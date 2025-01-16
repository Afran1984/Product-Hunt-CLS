import { Helmet } from 'react-helmet-async';
import Cover from '../../Shared/Cover/Cover';
import menuImg from '../../../assets/menu/banner3.jpg';
import dessertImg from '../../../assets/menu/dessert-bg.jpeg';
import PizzaImg from '../../../assets/menu/pizza-bg.jpg';
import SoupImg from '../../../assets/menu/soup-bg.jpg';
import saladImg from '../../../assets/menu/salad-bg.jpg';
import useMenu from '../../../Hooks/useMenu';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import MenuCategory from '../MenuCategory/MenuCategory';

const Menu = () => {
    const [menu] = useMenu();
    const dessert = menu.filter(item => item.category === 'dessert'); 
    const soup = menu.filter(item => item.category === 'soup'); 
    const salad = menu.filter(item => item.category === 'salad'); 
    const pizza = menu.filter(item => item.category === 'pizza'); 
    const offered = menu.filter(item => item.category === 'offered'); 
    return (
        <div>
            <Helmet>
                <title>84 Foodbar | Menu</title>
            </Helmet>
            <Cover menuImage={menuImg} title="Our Menu"></Cover>
            {/* main Cover */}
            <SectionTitle
            subHeading="Don't Miss" heading="Today's Offer"
            ></SectionTitle>
            {/* offered Menu Items*/}
            <MenuCategory
            items={offered}></MenuCategory>
            {/* dessert Menu Items */}
            <MenuCategory
            items={dessert}
            title="desert"
            img={dessertImg}
            ></MenuCategory>
            {/* Pizza */}
            <MenuCategory
            items={pizza}
            title="pizza"
            img={PizzaImg}
            ></MenuCategory>
            {/* Salad */}
            <MenuCategory
            items={salad}
            title="salad"
            img={saladImg}
            ></MenuCategory>
            {/* soup */}
            <MenuCategory
            items={soup}
            title="soup"
            img={SoupImg}
            ></MenuCategory>
            
        </div>
    );
};

export default Menu;
