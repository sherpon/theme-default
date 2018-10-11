import ProductCreatorButton from './productCreatorButton/productCreatorButton.jsx'
import ItemView from './itemView/itemView.jsx'
import ItemViewPlaceholder from './itemViewPlaceholder/itemViewPlaceholder.jsx'
import ProductEditor from './productEditor/productEditor.jsx'
import ProductsList from './productsList/productsList.jsx'
import PreviewList from './previewList/previewList.jsx'
import PreviewListPlaceholder from './previewListPlaceholder/previewListPlaceholder.jsx'

const Product = {
  CreatorButton: ProductCreatorButton,
  View: ItemView,
  ViewPlaceholder: ItemViewPlaceholder,
  Editor: ProductEditor,
  List: ProductsList,
  PreviewList: PreviewList,
  PreviewListPlaceholder: PreviewListPlaceholder
}

export default Product
