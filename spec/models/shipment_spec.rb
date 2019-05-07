require 'spec_helper'

describe Shipment do
  let(:customer) { Customer.create(email: 'x@x.com') }

  describe '#set_shipped_on' do
    let(:shipment) { Shipment.new(tracking_number: 'x', shipped_on: shipped_on, customer: customer) }
    before { shipment.save }
    subject { shipment.reload.shipped_on }

    context 'with a shipped_on already set' do
      let(:shipped_on) { 1.week.ago }
      it { should == 1.week.ago.to_date }
    end

    context 'without a shipped_on' do
      let(:shipped_on) { nil }
      it { should == Date.today }
    end
  end

  describe '#change_customer_status' do
    let(:shipment) { Shipment.new(tracking_number: 'x', customer: customer) }

    it 'should change customer status' do
      lambda { shipment.save }.should change { customer.status }.from('new').to('shipped')
    end
  end

end
