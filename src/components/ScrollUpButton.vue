<template>
    <button class="scroll-to-top" @click="scrollToTop" :class="{ 'show': showScrollButton }">
        <i class="fa-solid fa-arrow-up"></i>
    </button>
</template>
  
<script>
export default {
    data() {
        return {
            showScrollButton: false
        };
    },
    mounted() {
        window.addEventListener("scroll", this.handleScroll);
    },
    beforeUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    },
    methods: {
        handleScroll() {
            this.showScrollButton = window.scrollY > 200;
        },
        scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    }
};
</script>
  
<style>
.scroll-to-top {
    position: fixed;
    bottom: 35px;
    right: 10px;
    z-index: 100;
    display: none;
    border-radius: 50%;
    border: none;

}

.scroll-to-top i {
    font-size: 24px;
    color: #fff;
    background-color: rgba(242, 200, 2, 0.95);
    color: black;
    padding: 10px;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 2.5px 3px 15px 2px rgba(0, 0, 0, 1);
    transition: background-color 0.3s, box-shadow 0.3s;
}

.scroll-to-top:hover i {
    background-color: rgba(255, 213, 53, 0.95);
    box-shadow: 2.5px 3px 20px 3px rgba(0, 0, 0, 0.7);
}

.scroll-to-top.show {
    display: block !important;
}
</style>