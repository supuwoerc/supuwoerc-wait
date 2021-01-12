// element按需加载组件  减少项目体积
import {
    Select,
    Option,
    OptionGroup,
    Input,
    Tree,
    Dialog,
    Row,
    Col,
    Header,
    Container,
    Footer,
    Main,
    Button,
    ColorPicker,
    Menu,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Drawer
} from 'element-ui';
const element = {
    install: function(Vue) {
        Vue.use(Select)
        Vue.use(Header)
        Vue.use(Container)
        Vue.use(Main)
        Vue.use(Footer)
        Vue.use(Option)
        Vue.use(OptionGroup)
        Vue.use(Input)
        Vue.use(Tree)
        Vue.use(Dialog)
        Vue.use(Row)
        Vue.use(Col)
        Vue.use(Button)
        Vue.use(ColorPicker)
        Vue.use(Menu)
        Vue.use(Dropdown)
        Vue.use(DropdownMenu)
        Vue.use(DropdownItem)
        Vue.use(Submenu)
        Vue.use(MenuItem)
        Vue.use(MenuItemGroup)
        Vue.use(Drawer)
    }
}
export default element