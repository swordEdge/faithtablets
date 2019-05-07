ActiveAdmin.register Note do

  belongs_to :customer
  permit_params :text, :admin_user_id

  controller do
    def create
      note = current_admin_user.notes.create({
        customer_id: params[:customer_id],
        text: params[:note][:text]
      })
      redirect_to [:admin, note.customer]
    end
  end

end
