import { defineNuxtPlugin } from "#app"
// import PrimeVue from "primevue/config/config.esm.js"
// import Button from "primevue/button/button.esm.js"
// import Toast from "primevue/toast/toast.esm.js"
import Image from "primevue/image/image.esm.js"
// import InputText from "primevue/inputtext/inputtext.esm.js"


import PrimeVue from 'primevue/config/config.esm.js'
import AutoComplete from 'primevue/autocomplete/autocomplete.esm.js'
import Accordion from 'primevue/accordion/accordion.esm.js'
import AccordionTab from 'primevue/accordiontab/accordiontab.esm.js'
import Button from 'primevue/button/button.esm.js'
import Calendar from 'primevue/calendar/calendar.esm.js'
import Checkbox from 'primevue/checkbox/checkbox.esm.js'
import Chips from 'primevue/chips/chips.esm.js'
import Column from 'primevue/column/column.esm.js'
import ConfirmDialog from 'primevue/confirmdialog/confirmdialog.esm.js'
import ConfirmPopup from 'primevue/confirmpopup/confirmpopup.esm.js'
import ContextMenu from 'primevue/contextmenu/contextmenu.esm.js'
import DataTable from 'primevue/datatable/datatable.esm.js'
import Dialog from 'primevue/dialog/dialog.esm.js'
import Dropdown from 'primevue/dropdown/dropdown.esm.js'
import Fieldset from 'primevue/fieldset/fieldset.esm.js'
import InputNumber from 'primevue/inputnumber/inputnumber.esm.js'
import InputSwitch from 'primevue/inputswitch/inputswitch.esm.js'
import InputText from 'primevue/inputtext/inputtext.esm.js'
import Listbox from 'primevue/listbox/listbox.esm.js'
import Menu from 'primevue/menu/menu.esm.js'
import Menubar from 'primevue/menubar/menubar.esm.js'
import Message from 'primevue/message/message.esm.js'
import MultiSelect from 'primevue/multiselect/multiselect.esm.js'
import OverlayPanel from 'primevue/overlaypanel/overlaypanel.esm.js'
import Panel from 'primevue/panel/panel.esm.js'
import ProgressBar from 'primevue/progressbar/progressbar.esm.js'
import Rating from 'primevue/rating/rating.esm.js'
import RadioButton from 'primevue/radiobutton/radiobutton.esm.js'
import Ripple from 'primevue/ripple/ripple.esm.js'
import SelectButton from 'primevue/selectbutton/selectbutton.esm.js'
import Slider from 'primevue/slider/slider.esm.js'
import SplitButton from 'primevue/splitbutton/splitbutton.esm.js'
import TieredMenu from 'primevue/tieredmenu/tieredmenu.esm.js'
import Textarea from 'primevue/textarea/textarea.esm.js'
import Toast from 'primevue/toast/toast.esm.js'
import ToastService from 'primevue/toastservice/toastservice.esm.js'
import ConfirmationService from 'primevue/confirmationservice/confirmationservice.esm.js'
import TabView from 'primevue/tabview/tabview.esm.js'
import TabPanel from 'primevue/tabpanel/tabpanel.esm.js'
import Timeline from 'primevue/timeline/timeline.esm.js'
import ToggleButton from 'primevue/togglebutton/togglebutton.esm.js'
import Tooltip from 'primevue/tooltip/tooltip.esm.js'
import InlineMessage from 'primevue/inlinemessage/inlinemessage.esm.js'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(PrimeVue, { ripple: true })

    nuxtApp.vueApp.component('Image', Image)

    nuxtApp.vueApp.component('Accordion', Accordion)
    nuxtApp.vueApp.component('AccordionTab', AccordionTab)
    nuxtApp.vueApp.component('AutoComplete', AutoComplete)
    nuxtApp.vueApp.component('Button', Button)
    nuxtApp.vueApp.component('Calendar', Calendar)
    nuxtApp.vueApp.component('Checkbox', Checkbox)
    nuxtApp.vueApp.component('Chips', Chips)
    nuxtApp.vueApp.component('Column', Column)
    nuxtApp.vueApp.component('ConfirmDialog', ConfirmDialog)
    nuxtApp.vueApp.component('ConfirmPopup', ConfirmPopup)
    nuxtApp.vueApp.component('ContextMenu', ContextMenu)
    nuxtApp.vueApp.component('DataTable', DataTable)
    nuxtApp.vueApp.component('Dialog', Dialog)
    nuxtApp.vueApp.component('Dropdown', Dropdown)
    nuxtApp.vueApp.component('Fieldset', Fieldset)
    nuxtApp.vueApp.component('InputNumber', InputNumber)
    nuxtApp.vueApp.component('InputSwitch', InputSwitch)
    nuxtApp.vueApp.component('InputText', InputText)
    nuxtApp.vueApp.component('Listbox', Listbox)
    nuxtApp.vueApp.component('Menu', Menu)
    nuxtApp.vueApp.component('Menubar', Menubar)
    nuxtApp.vueApp.component('Message', Message)
    nuxtApp.vueApp.component('MultiSelect', MultiSelect)
    nuxtApp.vueApp.component('OverlayPanel', OverlayPanel)
    nuxtApp.vueApp.component('Panel', Panel)
    nuxtApp.vueApp.component('ProgressBar', ProgressBar)
    nuxtApp.vueApp.component('RadioButton', RadioButton)
    nuxtApp.vueApp.component('Rating', Rating)
    nuxtApp.vueApp.component('SelectButton', SelectButton)
    nuxtApp.vueApp.component('Slider', Slider)
    nuxtApp.vueApp.component('SplitButton', SplitButton)
    nuxtApp.vueApp.component('TabView', TabView)
    nuxtApp.vueApp.component('TabPanel', TabPanel)
    nuxtApp.vueApp.component('Textarea', Textarea)
    nuxtApp.vueApp.component('TieredMenu', TieredMenu)
    nuxtApp.vueApp.component('Toast', Toast)
    nuxtApp.vueApp.component('ToggleButton', ToggleButton)
    nuxtApp.vueApp.component('Timeline', Timeline)
    nuxtApp.vueApp.component('InlineMessage', InlineMessage)
    nuxtApp.vueApp.directive('tooltip', Tooltip)
    // nuxtApp.vueApp.directive('code', CodeHighlight)
    nuxtApp.vueApp.directive('ripple', Ripple)


})