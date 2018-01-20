<template>
    <div class="animated fadeIn index-wrapper">
        <vue-headful
                :title="metaTitle ||'Shift - Decentralize the web'"
                :description="metaDescription || 'Page meta description'"
        />
        <div class="card">
            <div class="card-header">
                Main page
            </div>
            <div class="card-body">
                {{allRoutes}}
            </div>
        </div>
    </div>
</template>

<script>
	export default {
		name: 'dashboard'
	}
</script>
