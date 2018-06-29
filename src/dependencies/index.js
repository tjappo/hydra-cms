import 'bootstrap'
import 'toastr/build/toastr.css' // You need style and css loader installed and set
import Vue from 'vue'
import jQuery from 'jquery'

window.moment = require('moment')
window.ClassicEditor = require('@ckeditor/ckeditor5-build-classic')
window.toastr = require('toastr')
window.Vue = Vue
window.$ = window.jQuery = jQuery

Vue.config.productionTip = false

require('./jsoneditor.js')
require('@/components/main/frontend/event-notification')
