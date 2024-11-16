
interface OrderSectionProps {
  orderState: 'no-order' | 'item-list' | 'payment';
  cartItems: Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
  }>;
  onAddOrder: () => void;
  onCancelOrder: () => void;
  onPlaceOrder: () => void;
  onEditOrder: () => void;
  onSubmitOrder: () => void;
}

export default function OrderSection({
  orderState,
  cartItems,
  onAddOrder,
  onCancelOrder,
  onPlaceOrder,
  onEditOrder,
  onSubmitOrder
}: OrderSectionProps) {
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const tax = calculateTotal() * 0.07;
  const finalTotal = calculateTotal() + tax;

  return (
    <div className="order_section">
      <div className="order_item_container">
        {orderState === 'no-order' && (
          <div id="no-order" className="no-order active p-4 p-sm-4 p-md-4 p-lg-5">
            <div className="banner_img">
              <img src="/images/img_noorder.png" className="w-full max-w-[265px] mx-auto mb-6" alt="Pas de commande" />
            </div>
            <h2 className="text-[#4D4D4D] text-2xl font-semibold leading-[31px] pb-4 m-0">
              Vous n'avez aucune<br />commande en cours
            </h2>
            <h3 className="text-[#b3b3b3] text-base font-normal m-0">
              Cliquez sur un article ou sur Ajouter une commande
            </h3>

            <div className="btn_box mt-12">
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={onAddOrder}
                  className="h-[50px] rounded-full text-lg bg-[#fbaf03] text-white transition-all hover:opacity-90"
                >
                  Ajouter 
                </button>
                <button 
                  className="h-[50px] rounded-full text-lg bg-transparent text-[#fbaf03] relative overflow-hidden hover:opacity-90
                    before:content-[''] before:absolute before:inset-0 before:bg-[#fbaf03] before:opacity-20"
                >
                  Statut commandes
                </button>
              </div>
            </div>
          </div>
        )}

        {orderState === 'item-list' && (
          <div id="item_list" className="item_list active">
            <div className="order_header bg-[#F4F5F8] px-[18px]">
              <div className="grid grid-cols-4 gap-4">
                <div className="text-[#b3b3b3] text-sm font-medium h-[40px] leading-[40px] uppercase tracking-wider">
                  Article
                </div>
                <div className="text-center text-[#b3b3b3] text-sm font-medium h-[40px] leading-[40px] uppercase tracking-wider">
                  Prix
                </div>
                <div className="text-center text-[#b3b3b3] text-sm font-medium h-[40px] leading-[40px] uppercase tracking-wider">
                  Qté
                </div>
                <div className="text-right text-[#b3b3b3] text-sm font-medium h-[40px] leading-[40px] uppercase tracking-wider">
                  Total
                </div>
              </div>
            </div>

            <div className="h-[313px] overflow-y-auto">
              {cartItems.map((item, index) => (
                <div key={index} className="px-[18px] py-[13px] border-b-[1.5px] border-[#F4F5F8]">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="text-[#4D4D4D] text-base font-semibold">{item.name}</div>
                    <div className="text-center text-[#4D4D4D] text-base font-semibold">
                      {item.price.toFixed(2)} €
                    </div>
                    <div className="text-center text-[#4D4D4D] text-base font-semibold">
                      {item.quantity}
                    </div>
                    <div className="text-right text-[#4D4D4D] text-base font-semibold">
                      {(item.price * item.quantity).toFixed(2)} €
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="order_footer bg-[#F4F5F8] pt-3">
              <div className="amount_details px-[18px] pb-[10px]">
                <div className="flex justify-between text-[#4D4D4D] text-base font-semibold py-1">
                  <span>Sous-total</span>
                  <span>{calculateTotal().toFixed(2)} €</span>
                </div>
                <div className="flex justify-between text-[#4D4D4D] text-base font-semibold py-1">
                  <span>TVA (7%)</span>
                  <span>{tax.toFixed(2)} €</span>
                </div>
              </div>

              <div className="amount_payble bg-[#F8F9FD] h-[40px] px-[18px]">
                <div className="flex justify-between text-[#4D4D4D] text-base font-semibold h-[40px] leading-[40px]">
                  <span>Total à payer</span>
                  <span>{finalTotal.toFixed(2)} €</span>
                </div>
              </div>

              <div className="grid grid-cols-2">
                <button
                  onClick={onCancelOrder}
                  className="h-[55px] bg-[#EF1010] text-white font-medium hover:opacity-90"
                >
                  Annuler
                </button>
                <button
                  onClick={onPlaceOrder}
                  className="h-[55px] bg-[#fbaf03] text-white font-medium hover:opacity-90"
                >
                  Commander
                </button>
              </div>
            </div>
          </div>
        )}

        {orderState === 'payment' && (
          <div id="amount_to_Pay" className="amount_to_Pay active px-4 py-3">
            <h4 className="pt-3 mb-3 text-[#4D4D4D] text-[1.2rem] font-normal">
              Total à payer <strong>{finalTotal.toFixed(2)} €</strong>
            </h4>

            <div className="space-y-4 mb-4 pb-2">
              <div>
                <h4 className="text-[#898c97] text-base font-medium mb-2">Mode de paiement</h4>
                <div className="flex space-x-6">
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="payment" defaultChecked className="text-[#fbaf03]" />
                    <span className="text-[#4D4D4D]">Espèces</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="payment" className="text-[#fbaf03]" />
                    <span className="text-[#4D4D4D]">Carte</span>
                  </label>
                </div>
              </div>

              <div>
                <h4 className="text-[#898c97] text-base font-medium mb-2">Type de commande</h4>
                <div className="flex space-x-6">
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="orderType" defaultChecked className="text-[#fbaf03]" />
                    <span className="text-[#4D4D4D]">À emporter</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="orderType" className="text-[#fbaf03]" />
                    <span className="text-[#4D4D4D]">Sur place</span>
                  </label>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-[#898c97] text-base font-medium">
                  Informations client (Optionnel)
                </h4>
                <input
                  type="text"
                  placeholder="Nom complet"
                  className="w-full p-2 rounded-[22px] bg-[#F4F5F8] border-none text-[#4D4D4D] focus:ring-2 focus:ring-[#fbaf03] focus:bg-white"
                />
                <input
                  type="tel"
                  placeholder="Numéro de téléphone"
                  className="w-full p-2 rounded-[22px] bg-[#F4F5F8] border-none text-[#4D4D4D] focus:ring-2 focus:ring-[#fbaf03] focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2">
              <button
                onClick={onEditOrder}
                className="h-[55px] bg-[#4D4D4D] text-white font-medium hover:opacity-90"
              >
                Modifier
              </button>
              <button
                onClick={onSubmitOrder}
                className="h-[55px] bg-[#fbaf03] text-white font-medium hover:opacity-90"
              >
                Valider
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}