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
        <div class="modal-content receipt" ref="receipt">
            <button @click="$emit('close')" class="btn btn-primary">Close</button>
            <h1>Order Receipt</h1>
            <p>Name: {{ orderData.customers_name }}</p>
            <p>Email: {{ orderData.customers_email }}</p>
            <p>Phone: {{ orderData.customers_phone_number }}</p>
            <p>Address: {{ orderData.customers_address }}</p>
            <h2>Amount paid</h2>
            <ul>
                <li v-for="(item, index) in orderData.food_items" :key="index">
                    ID: {{ item.id }} - Quantity: {{ item.quantity }} - Price: €{{ item.price }}
                </li>
            </ul>
            <p>Total: €{{ orderTotal }}</p>
            <button class="btn btn-success" @click="printReceipt">Print Receipt</button>
        </div>
        
    </div>
</template>



<style scoped lang="scss">

.receipt {
    font-family: 'Times New Roman', Times, serif;
    font-size: 14px;

}
@media print {
 
    .modal, .modal-content, .receipt {
        visibility: visible; 
    }

    .modal {
        position: absolute;
        left: 0;
        top: 0;
        margin: 0;
        padding: 0;
        overflow: visible; 
    }

    .btn {
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
  padding: 20px;
  border-radius: 5px;
  max-width: 500px; 
  text-align: center; 
}
  
</style>