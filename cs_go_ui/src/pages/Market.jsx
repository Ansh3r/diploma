import Button from '@mui/material/Button';

import { 
    useCallback,
    useEffect,
    useState, 
    memo, 
    useMemo 
} from 'react';
import { Navigate  } from 'react-router-dom'
import axios from 'axios';
import Skin from '../components/skin';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';

function Market({default_link_market, logged_in_market, account}) 
{ 
    const [wallet, setWallet] = useState()
    const stock = useMemo(() => localStorage.getItem('inventory'), [])
    const [All_skins, SetAllSkins] = useState([])
    const [trade_url, setTrade_url] = useState()
    const [open, setOpen] = useState(false);
    const clickedSkin = useMemo(() => All_skins.filter(skin=>skin.checked), [All_skins])
    const skins = []
    const arr_skins = []
    const [result, setResult] = useState()
    const handleClose = () => {setOpen(false);};
    
    const _cost = useMemo(() => {let cost = 0; clickedSkin.forEach(skin=>cost+=Number(skin.price));return cost},[clickedSkin]) // общая цена для ClickedSkin 
    const ShowSkins = useCallback(async () => 
    {const info = await axios.get(`${default_link_market}api/storage/`,{withCredentials: true}) // полученная дата выставляется если она не существует
            if (Object.keys(info.data).length !==0) 
            {
                localStorage.setItem('inventory', 
                JSON.stringify(info));
                setResult(info.data);
            }
        },[default_link_market],
    )
    useEffect(() =>
    {
        setTrade_url(account.trade_url)
        if (stock) setResult(JSON.parse(stock)?.data)
            else {ShowSkins(); return;}
        if (Object.keys(JSON.parse(stock).data).length === 0) ShowSkins();
    }, [ShowSkins, stock, account])
 
    useEffect(() => // по описанию каждого объекта а есть просто наши предметы и мы их сопоставляем
    {for (let k in result?.rgDescriptions)arr_skins.push(result.rgDescriptions[k]);    
        for (let k in result?.rgInventory)skins.push(result.rgInventory[k]);
         const localR=(skins.map((_skin) => // проходим по каждому предмету и если
         {
            for (let j = 0;j<arr_skins.length;j++) 
            {
                if (_skin.instanceid===arr_skins[j].instanceid && 
                    _skin.classid===arr_skins[j].classid) 
                {
                    if (arr_skins[j].tradable) 
                    { 
                        arr_skins[j].checked=false;return {...arr_skins[j]} // добавляем поле и возвращаем этот предмет
                    }
                }
            }return null})).filter(skin => skin != null) // в мэпе надо возвращать что то, объекты которые не подходят выкидывали
        let local = 0;
        localR.forEach(skin=>{skin.id = local; local=local+1;})
        SetAllSkins(localR); // присваиваем id чтоб они отличались, и выставляем массив
    }, [result])
    const clickSkin=(tag)=>{All_skins.find((skin, i)=> // для того чтоб отметить
        {if(skin.id==tag)
            {
                const localR=[...All_skins]
                localR[i].checked=!localR[i].checked;
                SetAllSkins(localR);
                return null;
            }
        })
    }

    function Withdraw() 
    {
        if(wallet && _cost && trade_url) 
        {
            axios.post(`${default_link_market}api/history/`, 
            {
                object_name:clickedSkin.map(skin=>skin.market_hash_name), 
                total_price:_cost, 
                wallet
            }, {withCredentials: true})
            alert("Заявка создана");
        }
        else 
        {
            setOpen(true);
        }
        
    }

    function setTradeUrl(){axios.post(`${default_link_market}api/trade_url/`, {trade_url:trade_url}, {withCredentials: true})}

  return (
    <div className="sell-page">
        {!logged_in_market && <Navigate replace to={'/'} />}
         <div className="modal-items">
            <div className="modal-header">
               <img className="steam-icon" alt='dsdd' src="https://avan.market/templates/frontend/default/images/steam-icon-skins.svg"/>
                <span className="text-with-icon"><b>Ваши</b> объекты</span>
            </div>
            <div className="link">
                    <span className="input-your-link">Вставьте свою ссылку на обмен:</span>
                    
                    <input type="text" value={trade_url} onChange={(e)=>setTrade_url(e.target.value)} className="input-link" placeholder="Ссылка на обмен"/>
                    <div> </div>
                    <Button className="save-offer-link" onClick={setTradeUrl} variant="contained" color="success">СОХРАНИТЬ</Button>
                </div>
                <div className="items">
                    {All_skins.map(skin => <Skin clickSkin={clickSkin} key={Math.random()} skin={skin}/>)}
                </div>
                <div className='selected'>Выбрано: {clickedSkin.length}
                <Button variant="contained" onClick={ShowSkins} size="small" color="success">Обновить</Button>
                </div>
                
         </div>

         <div className="modal-items">
            <div className="modal-header">
                <img className="steam-icon" alt='sdsds' src="https://avan.market/templates/frontend/default/images/steam-icon-skins.svg"/>
                <span className="text-with-icon"><b>Вы</b> получите</span>
            </div>
            <div className='amount'>
                <span>
                    <span className='dash'></span>
                    <span className='cost'>{_cost}</span>
                    <span className='cur'>₽</span>
                </span>
            </div>
           <div className='line'></div>
            <div className='method'>
               <div className='name'>Возможные способы оплаты</div>
               <div className='payment-list'>
                     <div className='payment visa'></div>
                     <div className='payment qiwi'></div>
               </div>
            </div>
            <div className='fields'>
                <div className='text-total-desc'>Платежные реквизиты</div>
                <input type="text" className="email" placeholder="Кошелек" onChange={(e)=>setWallet(e.target.value)}/>
                <div className='text-total-desc'>Электронная почта</div>
                <input type="text" className="email" placeholder="E-mail"/>
            </div>
            <Button className='get-money' variant="contained" onClick={Withdraw} color="success">СОЗДАТЬ ЗАЯВКУ</Button>
         </div>
         {open && <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Ошибка ввода"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Заполните пожалуйста все поля
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                      ОК
                    </Button>
                  </DialogActions>
                </Dialog>}
    </div>
    
  );
}

export default memo(Market);