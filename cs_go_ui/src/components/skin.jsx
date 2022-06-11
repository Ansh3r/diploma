
import '../App.css';

export default function Skin({skin, clickSkin}) 
{ 
    const img_object = 'http://steamcommunity-a.akamaihd.net/economy/image/'
   return (
    <div onClick={()=>clickSkin(skin.id)} className={skin.checked ? 'item checked' : 'item'}>
        <span className='item-price'>{skin.price} ₽</span>
        <img className='icon' src={img_object+skin.icon_url}/>
        <span className='item-name'>{skin.market_name}</span>
    </div>
   );
}