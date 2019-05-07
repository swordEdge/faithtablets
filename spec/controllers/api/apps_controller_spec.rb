require 'spec_helper'

describe Api::AppsController, type: :controller do

  describe '#index' do
    subject { response }
    let!(:app) { App.create(name: 'Christmas Story', slug: 'christmas-story', released_at: 1.month.ago) }
    let(:auth_token) { customer.auth_token }
    before { post :index, { email: customer.email, auth_token: auth_token } }

    context 'active customer' do
      let(:customer) { Customer.create(email: 'a@a.a', status: 'shipped') }
      its(:body) { should include('Christmas') }
    end

    context 'changed token' do
      let(:auth_token) { 'something' }
      let(:customer) { Customer.create(email: 'a@a.a', status: 'shipped') }
      its(:status) { should == 401 }
    end

    context 'canceled customer' do
      let(:customer) { Customer.create(email: 'a@a.a', status: 'canceled') }
      its(:status) { should == 401 }
    end

  end
end
