import './categories-container.styles.scss'
import CategoryItem from '../category-item/category-item.component.jsx';

const CategoriesContainer = ({categories})=>{
    return (
        <div className='categories-container'>
        {
            categories.map((category)=>{
              return (
                <CategoryItem key={category.id} 
                imageUrl={category.imageUrl} 
                title={category.title}/>
                
              )
            })
        }
        </div>
    )
}

export default CategoriesContainer;