class ImportShipment

  def self.[](params)
    new(params).import
  end

  def initialize(params)
    @workbook = Creek::Book.new params[:dump][:file].tempfile.path, check_file_extension: false
  end

  def sheet
    @sheet ||= @workbook.sheets[0]
  end

  def import
    sheet.rows.map {|row| Data.new(row).import }
  end

  class Data

    def initialize(row)
      @row = row
    end

    def tracking_number
      @tracking_number ||= @row.values[10]
    end

    def recurly_account_code
      @recurly_account_code ||= @row.values[0]
    end

    def customer
      @customer ||= Customer.find_by_recurly_account_code(recurly_account_code)
    end

    def valid?
      customer.present? && tracking_number != 'Not Generated'
    end

    def import
      if valid?
        shipment = customer.shipments.new(tracking_number: tracking_number)
        shipment.queue_email_notification if shipment.save
      end
    end

  end

end
