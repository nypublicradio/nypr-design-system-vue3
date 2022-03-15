import { createApp, reactive } from 'vue'
import router from './router'
import App from './App.vue'

import PrimeVue from 'primevue/config'
import AutoComplete from 'primevue/autocomplete'
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
import Button from 'primevue/button'
import Calendar from 'primevue/calendar'
import Checkbox from 'primevue/checkbox'
import Chips from 'primevue/chips'
import Column from 'primevue/column'
import ConfirmDialog from 'primevue/confirmdialog'
import ConfirmPopup from 'primevue/confirmpopup'
import ContextMenu from 'primevue/contextmenu'
import DataTable from 'primevue/datatable'
import Dialog from 'primevue/dialog'
import Dropdown from 'primevue/dropdown'
import Fieldset from 'primevue/fieldset'
import InputNumber from 'primevue/inputnumber'
import InputSwitch from 'primevue/inputswitch'
import InputText from 'primevue/inputtext'
import Listbox from 'primevue/listbox'
import Menu from 'primevue/menu'
import Menubar from 'primevue/menubar'
import Message from 'primevue/message'
import MultiSelect from 'primevue/multiselect'
import OverlayPanel from 'primevue/overlaypanel'
import Panel from 'primevue/panel'
import ProgressBar from 'primevue/progressbar'
import Rating from 'primevue/rating'
import RadioButton from 'primevue/radiobutton'
import Ripple from 'primevue/ripple'
import SelectButton from 'primevue/selectbutton'
import Slider from 'primevue/slider'
import SplitButton from 'primevue/splitbutton'
import TieredMenu from 'primevue/tieredmenu'
import Textarea from 'primevue/textarea'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import Timeline from 'primevue/timeline'
import ToggleButton from 'primevue/togglebutton'
import Tooltip from 'primevue/tooltip'
import InlineMessage from 'primevue/inlinemessage'
// import CodeHighlight from './CodeHighlight'

// also imported in Home.vue styles area because @functions were not compiling for some reason.
//if (import.meta.env.VITE_VUE_APP_EDITOR === 'code') {
import './assets/themes/white-label/_theme.scss'
//}
import 'primevue/resources/primevue.min.css'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'
// import 'prismjs/themes/prism-coy.css'
import './assets/styles/flags.css'


router.beforeEach(function (to, from, next) {
    window.scrollTo(0, 0)
    next()
})

const app = createApp(App)

// app.config.globalProperties.$allowDownload = (import.meta.NODE_ENV === 'development')
app.config.globalProperties.$allowDownload = true
app.config.globalProperties.$appState = reactive({ inputStyle: 'outlined' })

app.use(PrimeVue, { ripple: true })
app.use(ToastService)
app.use(ConfirmationService)
app.use(router)

app.component('Accordion', Accordion)
app.component('AccordionTab', AccordionTab)
app.component('AutoComplete', AutoComplete)
app.component('Button', Button)
app.component('Calendar', Calendar)
app.component('Checkbox', Checkbox)
app.component('Chips', Chips)
app.component('Column', Column)
app.component('ConfirmDialog', ConfirmDialog)
app.component('ConfirmPopup', ConfirmPopup)
app.component('ContextMenu', ContextMenu)
app.component('DataTable', DataTable)
app.component('Dialog', Dialog)
app.component('Dropdown', Dropdown)
app.component('Fieldset', Fieldset)
app.component('InputNumber', InputNumber)
app.component('InputSwitch', InputSwitch)
app.component('InputText', InputText)
app.component('Listbox', Listbox)
app.component('Menu', Menu)
app.component('Menubar', Menubar)
app.component('Message', Message)
app.component('MultiSelect', MultiSelect)
app.component('OverlayPanel', OverlayPanel)
app.component('Panel', Panel)
app.component('ProgressBar', ProgressBar)
app.component('RadioButton', RadioButton)
app.component('Rating', Rating)
app.component('SelectButton', SelectButton)
app.component('Slider', Slider)
app.component('SplitButton', SplitButton)
app.component('TabView', TabView)
app.component('TabPanel', TabPanel)
app.component('Textarea', Textarea)
app.component('TieredMenu', TieredMenu)
app.component('Toast', Toast)
app.component('ToggleButton', ToggleButton)
app.component('Timeline', Timeline)
app.component('InlineMessage', InlineMessage)
app.directive('tooltip', Tooltip)
// app.directive('code', CodeHighlight)
app.directive('ripple', Ripple)

app.mount('#app')
