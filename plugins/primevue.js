/*BE SURE TO SYNC E:\git\_NYPR\nypr-design-system-vue3\src\main.js with the follwoing as well*/

import { defineNuxtPlugin } from "#app"
import PrimeVue from 'primevue/config'
import AutoComplete from 'primevue/autocomplete'
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
import Avatar from 'primevue/avatar'
import AvatarGroup from 'primevue/avatargroup'
import Badge from 'primevue/badge'
import BadgeDirective from 'primevue/badgedirective'
import BlockUI from 'primevue/blockui'
import Button from 'primevue/button'
import Breadcrumb from 'primevue/breadcrumb'
import Calendar from 'primevue/calendar'
import Card from 'primevue/card'
//import Chart from 'primevue/chart'
import CascadeSelect from 'primevue/cascadeselect'
import Carousel from 'primevue/carousel'
import Checkbox from 'primevue/checkbox'
import Chip from 'primevue/chip'
import Chips from 'primevue/chips'
import ColorPicker from 'primevue/colorpicker'
import Column from 'primevue/column'
import ColumnGroup from 'primevue/columngroup'
import ConfirmDialog from 'primevue/confirmdialog'
import ConfirmPopup from 'primevue/confirmpopup'
import ConfirmationService from 'primevue/confirmationservice'
import ContextMenu from 'primevue/contextmenu'
import DataTable from 'primevue/datatable'
import DataView from 'primevue/dataview'
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions'
import DeferredContent from 'primevue/deferredcontent'
import Dialog from 'primevue/dialog'
import DialogService from 'primevue/dialogservice'
import Divider from 'primevue/divider'
import Dock from 'primevue/dock'
import Dropdown from 'primevue/dropdown'
import DynamicDialog from 'primevue/dynamicdialog'
import Fieldset from 'primevue/fieldset'
import FileUpload from 'primevue/fileupload'
import Galleria from 'primevue/galleria'
import Image from 'primevue/image'
import InlineMessage from 'primevue/inlinemessage'
import Inplace from 'primevue/inplace'
import InputSwitch from 'primevue/inputswitch'
import InputText from 'primevue/inputtext'
import InputMask from 'primevue/inputmask'
import InputNumber from 'primevue/inputnumber'
import Knob from 'primevue/knob'
import Listbox from 'primevue/listbox'
import MegaMenu from 'primevue/megamenu'
import Menu from 'primevue/menu'
import Menubar from 'primevue/menubar'
import Message from 'primevue/message'
import MultiSelect from 'primevue/multiselect'
import OrderList from 'primevue/orderlist'
import OrganizationChart from 'primevue/organizationchart'
import OverlayPanel from 'primevue/overlaypanel'
import Paginator from 'primevue/paginator'
import Panel from 'primevue/panel'
import PanelMenu from 'primevue/panelmenu'
import Password from 'primevue/password'
import PickList from 'primevue/picklist'
import ProgressBar from 'primevue/progressbar'
import ProgressSpinner from 'primevue/progressspinner'
import Rating from 'primevue/rating'
import RadioButton from 'primevue/radiobutton'
import Ripple from 'primevue/ripple'
import Row from 'primevue/row'
import SelectButton from 'primevue/selectbutton'
import ScrollPanel from 'primevue/scrollpanel'
import ScrollTop from 'primevue/scrolltop'
import Skeleton from 'primevue/skeleton'
import Slider from 'primevue/slider'
import Sidebar from 'primevue/sidebar'
import SpeedDial from 'primevue/speeddial'
import SplitButton from 'primevue/splitbutton'
import Splitter from 'primevue/splitter'
import SplitterPanel from 'primevue/splitterpanel'
import Steps from 'primevue/steps'
import StyleClass from 'primevue/styleclass'
import TabMenu from 'primevue/tabmenu'
import TieredMenu from 'primevue/tieredmenu'
import Textarea from 'primevue/textarea'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'
import Toolbar from 'primevue/toolbar'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import Tag from 'primevue/tag'
import Terminal from 'primevue/terminal'
import Timeline from 'primevue/timeline'
import ToggleButton from 'primevue/togglebutton'
import Tooltip from 'primevue/tooltip'
import Tree from 'primevue/tree'
import TreeSelect from 'primevue/treeselect'
import TreeTable from 'primevue/treetable'
import TriStateCheckbox from 'primevue/tristatecheckbox'
import VirtualScroller from 'primevue/virtualscroller'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(PrimeVue, { ripple: true })
    nuxtApp.vueApp.use(ToastService)
    nuxtApp.vueApp.use(DialogService)
    nuxtApp.vueApp.use(ConfirmationService)

    nuxtApp.vueApp.directive('tooltip', Tooltip)
    nuxtApp.vueApp.directive('badge', BadgeDirective)
    nuxtApp.vueApp.directive('ripple', Ripple)
    nuxtApp.vueApp.directive('styleclass', StyleClass)

    nuxtApp.vueApp.component('Accordion', Accordion)
    nuxtApp.vueApp.component('AccordionTab', AccordionTab)
    nuxtApp.vueApp.component('AutoComplete', AutoComplete)
    nuxtApp.vueApp.component('Avatar', Avatar)
    nuxtApp.vueApp.component('AvatarGroup', AvatarGroup)
    nuxtApp.vueApp.component('Badge', Badge)
    nuxtApp.vueApp.component('BlockUI', BlockUI)
    nuxtApp.vueApp.component('Breadcrumb', Breadcrumb)
    nuxtApp.vueApp.component('Button', Button)
    nuxtApp.vueApp.component('Calendar', Calendar)
    nuxtApp.vueApp.component('Card', Card)
    //nuxtApp.vueApp.component('Chart', Chart)
    nuxtApp.vueApp.component('Carousel', Carousel)
    nuxtApp.vueApp.component('CascadeSelect', CascadeSelect)
    nuxtApp.vueApp.component('Checkbox', Checkbox)
    nuxtApp.vueApp.component('Chip', Chip)
    nuxtApp.vueApp.component('Chips', Chips)
    nuxtApp.vueApp.component('ColorPicker', ColorPicker)
    nuxtApp.vueApp.component('Column', Column)
    nuxtApp.vueApp.component('ColumnGroup', ColumnGroup)
    nuxtApp.vueApp.component('ConfirmDialog', ConfirmDialog)
    nuxtApp.vueApp.component('ConfirmPopup', ConfirmPopup)
    nuxtApp.vueApp.component('ContextMenu', ContextMenu)
    nuxtApp.vueApp.component('DataTable', DataTable)
    nuxtApp.vueApp.component('DataView', DataView)
    nuxtApp.vueApp.component('DataViewLayoutOptions', DataViewLayoutOptions)
    nuxtApp.vueApp.component('DeferredContent', DeferredContent)
    nuxtApp.vueApp.component('Dialog', Dialog)
    nuxtApp.vueApp.component('Divider', Divider)
    nuxtApp.vueApp.component('Dock', Dock)
    nuxtApp.vueApp.component('Dropdown', Dropdown)
    nuxtApp.vueApp.component('DynamicDialog', DynamicDialog)
    nuxtApp.vueApp.component('Fieldset', Fieldset)
    nuxtApp.vueApp.component('FileUpload', FileUpload)
    nuxtApp.vueApp.component('Galleria', Galleria)
    nuxtApp.vueApp.component('Image', Image)
    nuxtApp.vueApp.component('InlineMessage', InlineMessage)
    nuxtApp.vueApp.component('Inplace', Inplace)
    nuxtApp.vueApp.component('InputMask', InputMask)
    nuxtApp.vueApp.component('InputNumber', InputNumber)
    nuxtApp.vueApp.component('InputSwitch', InputSwitch)
    nuxtApp.vueApp.component('InputText', InputText)
    nuxtApp.vueApp.component('Knob', Knob)
    nuxtApp.vueApp.component('Listbox', Listbox)
    nuxtApp.vueApp.component('MegaMenu', MegaMenu)
    nuxtApp.vueApp.component('Menu', Menu)
    nuxtApp.vueApp.component('Menubar', Menubar)
    nuxtApp.vueApp.component('Message', Message)
    nuxtApp.vueApp.component('MultiSelect', MultiSelect)
    nuxtApp.vueApp.component('OrderList', OrderList)
    nuxtApp.vueApp.component('OrganizationChart', OrganizationChart)
    nuxtApp.vueApp.component('OverlayPanel', OverlayPanel)
    nuxtApp.vueApp.component('Paginator', Paginator)
    nuxtApp.vueApp.component('Panel', Panel)
    nuxtApp.vueApp.component('PanelMenu', PanelMenu)
    nuxtApp.vueApp.component('Password', Password)
    nuxtApp.vueApp.component('PickList', PickList)
    nuxtApp.vueApp.component('ProgressBar', ProgressBar)
    nuxtApp.vueApp.component('ProgressSpinner', ProgressSpinner)
    nuxtApp.vueApp.component('RadioButton', RadioButton)
    nuxtApp.vueApp.component('Rating', Rating)
    nuxtApp.vueApp.component('Row', Row)
    nuxtApp.vueApp.component('SelectButton', SelectButton)
    nuxtApp.vueApp.component('ScrollPanel', ScrollPanel)
    nuxtApp.vueApp.component('ScrollTop', ScrollTop)
    nuxtApp.vueApp.component('Slider', Slider)
    nuxtApp.vueApp.component('Sidebar', Sidebar)
    nuxtApp.vueApp.component('Skeleton', Skeleton)
    nuxtApp.vueApp.component('SpeedDial', SpeedDial)
    nuxtApp.vueApp.component('SplitButton', SplitButton)
    nuxtApp.vueApp.component('Splitter', Splitter)
    nuxtApp.vueApp.component('SplitterPanel', SplitterPanel)
    nuxtApp.vueApp.component('Steps', Steps)
    nuxtApp.vueApp.component('TabMenu', TabMenu)
    nuxtApp.vueApp.component('TabView', TabView)
    nuxtApp.vueApp.component('TabPanel', TabPanel)
    nuxtApp.vueApp.component('Tag', Tag)
    nuxtApp.vueApp.component('Textarea', Textarea)
    nuxtApp.vueApp.component('Terminal', Terminal)
    nuxtApp.vueApp.component('TieredMenu', TieredMenu)
    nuxtApp.vueApp.component('Timeline', Timeline)
    nuxtApp.vueApp.component('Toast', Toast)
    nuxtApp.vueApp.component('Toolbar', Toolbar)
    nuxtApp.vueApp.component('ToggleButton', ToggleButton)
    nuxtApp.vueApp.component('Tree', Tree)
    nuxtApp.vueApp.component('TreeSelect', TreeSelect)
    nuxtApp.vueApp.component('TreeTable', TreeTable)
    nuxtApp.vueApp.component('TriStateCheckbox', TriStateCheckbox)
    nuxtApp.vueApp.component('VirtualScroller', VirtualScroller)
})
