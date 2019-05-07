class HelpingHands

  class Auth
    def self.[](email)
      new(email).auth
    end

    attr_reader :email

    def initialize(email)
      @email = email
    end

    def uri
      URI('https://www.gethelpinghands.com/api/customers/auth')
    end


    def response
      @response ||= Net::HTTP.post_form(uri, email: email)
    end

    def auth
      if response.code.to_i == 200
        JSON.parse(response.body)
      else
        nil
      end
    end

  end

end
