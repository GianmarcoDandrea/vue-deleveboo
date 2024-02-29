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
  
<style lang="scss" scoped>
.scroll-to-top {
    position: fixed;
    bottom: 90px;
    right: 20px;
    z-index: 100;
    display: none;
    border-radius: 50%;
    border: none;
    width: 40px;
    height: 40px;
    background-color: rgba(242, 200, 2, 0.95);
    box-shadow: 2.5px 3px 15px 2px rgba(0, 0, 0, 1);
    transition: background-color 0.3s, box-shadow 0.3s;
}

.scroll-to-top i {
    font-size: 24px;
    color: black;
    cursor: pointer;
    &:hover {
            color: #fff;
        }
}

.scroll-to-top:hover {
    background-color: rgba(255, 213, 53, 0.95);
    box-shadow: 2.5px 3px 20px 3px rgba(0, 0, 0, 0.7);
}

.scroll-to-top.show {
    display: block !important;
}

@media screen and (min-width: 768px) {
    .scroll-to-top {
        transform: scale(1.3);
        bottom: 100px;
        right: 30px;
    }
}

@media screen and (min-width: 1024px) {
    .scroll-to-top {
        transform: scale(1.5);
        bottom: 120px;
        right: 40px;
    }
}

@media screen and (min-width: 1440px) {
    .scroll-to-top {
        transform: scale(1.8);
        right: 60px;
        bottom: 145px;
    }
}
</style>