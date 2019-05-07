require 'spec_helper'

describe Api::CustomersController, type: :controller do

  describe '#auth' do
    subject { response }
    before { post :auth, { email: customer.email } }

    context 'active customer' do
      let(:customer) { Customer.create(email: 'a@a.a', status: 'shipped') }
      its(:body) { should include(customer.auth_token) }
    end

    context 'canceled customer' do
      let(:customer) { Customer.create(email: 'a@a.a', status: 'canceled') }
      its(:status) { should == 401 }
    end

    context 'canceled and active' do
      before { Customer.create(email: 'a@a.a', status: 'canceled') }
      let(:customer) { Customer.create(email: 'a@a.a', status: 'shipped') }
      its(:body) { should include(customer.auth_token) }
    end

  end
end
