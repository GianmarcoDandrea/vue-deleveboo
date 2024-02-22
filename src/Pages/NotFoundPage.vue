<script>
export default {

}
</script>


<template>
    <div class="container">
        <h1 class="text-center"> 404 - Qualcosa è andato storto</h1>
        <p class="text-center"> La pagina che cercavi non è stata trovata </p>

        <router-link class="btn btn-primary" :to="{ name: 'home' }">Indietro</router-link>


    </div>
</template>

<style lang="scss" scoped></style>