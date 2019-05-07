require 'spec_helper'

describe Customer do

  let(:customer) { Customer.new(subscribed_at: days.days.ago) }
  subject { customer }

  describe 'available apps' do
    context 'when more than 1 month' do
      let(:days) { 35 }
      its(:months_active) { should == 2 }
      its(:accessible_app_count) { should == 20 }
    end

    context 'when less than 1 month' do
      let(:days) { 3 }
      its(:months_active) { should == 1 }
      its(:accessible_app_count) { should == 10 }
    end

    context 'when more than 3 months' do
      let(:days) { 95 }
      its(:months_active) { should == 4 }
      its(:accessible_app_count) { should == 40 }
    end
  end
end
