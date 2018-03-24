<template>
    <header class="app-header navbar">
        <button class="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button"
                @click.prevent="mobileSidebarToggle">
            <span class="navbar-toggler-icon"></span>
        </button>
        <b-link class="navbar-brand" :to="{name : 'Index'}"></b-link>
        <button class="navbar-toggler sidebar-toggler d-md-down-none mr-auto" type="button"
                @click.prevent="sidebarToggle">
            <span class="navbar-toggler-icon"></span>
        </button>
        <!--<button class="navbar-toggler aside-menu-toggler d-md-down-none" type="button" @click.prevent="asideToggle">-->
            <!--<span class="navbar-toggler-icon"></span>-->
        <!--</button>-->
    </header>
</template>
<script>
    export default {
        name: 'custom-header',
        methods: {
            sidebarToggle(e) {
                document.body.classList.toggle('sidebar-hidden');
            },
            sidebarMinimize(e) {
                document.body.classList.toggle('sidebar-minimized');
            },
            mobileSidebarToggle(e) {
                document.body.classList.toggle('sidebar-mobile-show');
            },
//    asideToggle (e) {
//      document.body.classList.toggle('aside-menu-hidden');
//    }
        }
    }
</script>
