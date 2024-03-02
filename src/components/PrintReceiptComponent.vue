<script>
export default {
    props: ['orderData', 'isVisible'],
    data(){
        return{}
    },
    computed: {
        orderTotal() {
            const totalAmount = this.orderData.food_items.reduce(
                (total, item) => total + parseFloat(item.price * item.quantity),
                0
            );
            return totalAmount.toFixed(2);
        },
    },
    methods:{

        printReceipt() {
        this.$nextTick(() => {
            window.print();
            });
        }, 
        closeModal() {
            this.$emit('close');
        },

    }
}
</script>



<template>

    <div v-if="isVisible" class="modal">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="modal-title">Order Receipt</h2>  
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body receipt text-start" ref="receipt">
                    <p>Name: <strong>{{ orderData.customers_name }}</strong></p>
                    <p>Email:  <strong>{{ orderData.customers_email }} </strong> </p>
                    <p>Phone:  <strong>{{ orderData.customers_phone_number }} </strong></p>
                    <p>Address:  <strong>{{ orderData.customers_address }} </strong></p>
                    <hr>
                    <h4>Amount paid</h4>
                    <ul class = "list-unstyled">
                        <li v-for="(item, index) in orderData.food_items" :key="index">
                                ID: {{ item.id }} - Quantity: {{ item.quantity }} - Price: €{{ item.price }}
                        </li>
                    </ul>
                    <h5>Total: €{{ orderTotal }}</h5>
                </div>
                <div class="modal-footer d-flex justify-content-between">
                   <button @click="$emit('close')" class="btn btn-primary">Close</button>
                   <button class="btn btn-success" @click="printReceipt">Print Receipt</button> 
                </div>
            </div>
        </div>
    </div>
    
  

</template>



<style scoped lang="scss">



@media print {
 
    .modal, .modal-dialog, .modal-content, .modal-body {
        display: block;
        width: auto;
        position: static; 
        page-break-after: avoid; 
        border: none;
    }
    .btn, .modal-footer {
        display: none; 
    }
}
  .modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed; 
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5); 
  }
  .modal-content {
  background-color: #fff;
  padding: 2rem;
  border-radius: 5px;
  max-width: 100%; 
  text-align: left; 

  p, ul, li {
    font-size: 1.2rem;
  }
}
  
</style>