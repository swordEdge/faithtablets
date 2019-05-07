$(document).on('ajax:success', 'form.edit_customer', function(){
  $('#registrationModal').modal('hide');
});

function track(product) {
  fbq('trackCustom', 'Purchase' + product, { value: 35, currency: 'USD', });
  window.ga('send', 'event', 'conversion', 'purchase', '', 40);
}

var CheckoutCtrl = function($scope) {
  $scope.playVideo = function(play) {
    if(play != false) {
      if(play == 'overview') {
        $scope.showOverview = true;
        $scope.showVideo = true;
        document.getElementById('overview').play();
      } else if (play == 'ashley') {
        $scope.showAshley = true;
        $scope.showVideo = true;
        document.getElementById('ashley').play();
      } else {
        $scope.showSample = true;
        $scope.showVideo = true;
        document.getElementById('sample').play();
      }
    } else {
      $scope.showVideo = false;
      $scope.showAshley = false;
      document.getElementById('ashley').pause();
      $scope.showOverview = false;
      document.getElementById('overview').pause();
      $scope.showSample = false;
      document.getElementById('sample').pause();
    }
  };

  $scope.appsOnly = null;
  $scope.step = 1;
  $scope.hideModal = function() {
    $('#checkoutModal, .modal-backdrop').hide();
  };
  $scope.buyTablet = function(product_type) {
    $scope.product_type = product_type;
    $scope.step = 2;
    $('#checkoutModal, .modal-backdrop').show();
  };
  $scope.selectStep = function(e, step) {
    var target = $(e.target).closest('.step-tab');
    if (target.hasClass('selectable')) $scope.step = step;
  };
  $scope.tabletsPrice = function() {
    return 0
  };
  $scope.subPrice = function() {
    return 29.95
  };
  $scope.shippingPrice = function() {
    return 4.95
  };
  $scope.couponDiscount = function() {
    if ($scope.coupon_code === 'noshipping') {
      return 4.95
    } else {
      return 0
    }
  };
  $scope.totalPrice = function() {
    return $scope.tabletsPrice() + $scope.subPrice() + $scope.shippingPrice() - $scope.couponDiscount();
  };

  $scope.stepComplete = function(step) {
    switch (step) {
      case 1:
        return ($scope.girl || $scope.boy) &&
          ($scope.age0to6 || $scope.age7to9 || $scope.age10to13 || $scope.age14plus) &&
          ($scope.coping || $scope.handling || $scope.managing || $scope.following || $scope.other);
      case 2:
        return $scope.first_name
          && $scope.last_name
          && $scope.email
          && $scope.phone
          && $scope.address
          && $scope.city
          && $scope.state
          && $scope.zip;
      case 3:
        return $scope.card_number
          && $scope.card_expire_month
          && $scope.card_expire_year
          && $scope.card_cvc;
    }
  };

  $scope.saveContact = function() {
    fbq('trackCustom', 'AddToCart' + $scope.product_type);
    $scope.step = 3;
    $.ajax({
      url: '/api/leads',
      type: 'POST',
      data: {
        first_name: $scope.first_name,
        last_name: $scope.last_name,
        email: $scope.email,
        phone: $scope.phone,
        address: $scope.address,
        city: $scope.city,
        state: $scope.state,
        zip: $scope.zip,
        boy: $scope.boy,
        girl: $scope.girl,
        age0to6: $scope.age0to6,
        age7to9: $scope.age7to9,
        age10to13: $scope.age10to13,
        age14plus: $scope.age14plus,
        coping: $scope.coping,
        handling: $scope.handling,
        managing: $scope.managing,
        following: $scope.following,
        other: $scope.other,
        product_type: $scope.product_type
      },
      dataType: 'json'
    })
  };

  $scope.upgrade = function() {
    $scope.processing = true;
    $.ajax({
      url: '/api/customers/upgrade',
      type: 'POST',
      data: {
        customer_id: $scope.customer_id,
        auth_token: $scope.auth_token,
      },
      dataType: 'json'
    }).done(function(data) {
      $scope.processing = false;
      $scope.errors = null;
      $scope.step = 5;
      $scope.$apply();
    }).fail(function(xhr, status) {
      $scope.processing = false;
      $scope.errors = xhr.responseJSON.errors;
      $scope.$apply();
    });
  }

  $scope.done = function() {
    $scope.processing = true;
    recurly.token($('#checkout'), function (err, token) {
      if (!token) {
        console.log('no token');
        console.log(err);
        $scope.processing = false;
        $scope.errors = ["There was a problem processing your credit card. Please try again."];
        $scope.$apply();
        return;
      }
      $.ajax({
        url: '/api/customers',
        type: 'POST',
        data: {
          token: token,
          first_name: $scope.first_name,
          last_name: $scope.last_name,
          email: $scope.email,
          phone: $scope.phone,
          address: $scope.address,
          city: $scope.city,
          state: $scope.state,
          zip: $scope.zip,
          coupon_code: $scope.coupon_code,
          product_type: $scope.product_type
        },
        dataType: 'json'
      })
      .done(function(data) {
        track($scope.product_type);
        $scope.processing = false;
        $scope.errors = null;
        $scope.step = 4;
        $scope.customer_id = data.id;
        $scope.auth_token = data.auth_token;
        $scope.$apply();
      })
      .fail(function(xhr, status) {
        $scope.processing = false;
        $scope.errors = xhr.responseJSON.errors;
        $scope.$apply();
      });
    });
  };

  $scope.tryAgain = function() {
    $scope.step = 3;
    $scope.errors = null;
  }

  $('#checkoutModal').off('show.bs.modal').on('show.bs.modal', function (e) {
    $scope.step = 1;
    $scope.card_number = null;
    $scope.card_expire_month = null;
    $scope.card_expire_year = null;
    $scope.card_cvc = null;
    $scope.first_name = null;
    $scope.last_name = null;
    $scope.email = null;
    $scope.phone = null;
    $scope.address = null;
    $scope.city = null;
    $scope.state = null;
    $scope.zip = null;
    $scope.$apply();
  });
};
