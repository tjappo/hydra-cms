<template>
    <footer class="app-footer">
        <span>Copyright &copy; {{getDate}} by Shift</span>
        <span class="ml-auto">Powered by <a href="http://coreui.io">CoreUI</a></span>
    </footer>
</template>
<script>
	export default {
		name: 'custom-footer',
		computed: {
			getDate() {
				return new Date().getFullYear();
			}
        }
	}
</script>
