
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Header} from "./components/header/header";
import { Login } from './components/login/login';
import { SignUp } from './components/sign-up/sign-up';
import { Home } from './components/home/home';
import { ViewProductDetails } from './components/view-product-details/view-product-details';
import { SearchView } from './components/search-view/search-view';
import { Bath } from './components/products/bath/bath';
import { BathSalt } from './components/products/bath/pages/bath-salt';
import { ShowerGel } from './components/products/bath/pages/shower-gel';
import { ShowerOil } from './components/products/bath/pages/shower-oil';
import { Soap } from './components/products/bath/pages/soap';
import { Hair } from './components/products/hair/hair';
import { Accesories } from './components/products/hair/accesories/accesories';
import { HairBrush } from './components/products/hair/accesories/pages/hair-brush';
import { HairPins } from './components/products/hair/accesories/pages/hair-pins';
import { HairTie } from './components/products/hair/accesories/pages/hair-tie';
import { HairCare } from './components/products/hair/hair-care/hair-care';
import { HairBalm } from './components/products/hair/hair-care/pages/hair-balm';
import { HairMask } from './components/products/hair/hair-care/pages/hair-mask';
import { HairOil } from './components/products/hair/hair-care/pages/hair-oil';
import { Shampoo } from './components/products/hair/hair-care/pages/shampoo';
import { Styling } from './components/products/hair/styling/styling';
import { HairWax } from './components/products/hair/styling/pages/hair-wax';
import { HairGel } from './components/products/hair/styling/pages/hair-gel';
import { HairSpray } from './components/products/hair/styling/pages/hair-spray';
import { MakeUp } from './components/products/makeup/makeup';
import { Brushes } from './components/products/makeup/brushes/brushes';
import { Eyebrows } from './components/products/makeup/eyebrows/eyebrows';
import { EyebrowsGel } from './components/products/makeup/eyebrows/pages/eyebrows-gel';
import { EyebrowsPencil} from './components/products/makeup/eyebrows/pages/eyebrows-pencil';
import { Eyes } from './components/products/makeup/eyes/eyes';
import { EyePencil} from './components/products/makeup/eyes/pages/eye-pencil';
import { Eyeliner} from './components/products/makeup/eyes/pages/eyeliner';
import { Lashes} from './components/products/makeup/eyes/pages/lashes';
import { Mascara} from './components/products/makeup/eyes/pages/mascara';
import { Palette} from './components/products/makeup/eyes/pages/palette';
import { Face } from './components/products/makeup/face/face';
import { Concelear } from './components/products/makeup/face/pages/concelear';
import { FacePowder } from './components/products/makeup/face/pages/face-powder';
import { Foundation } from './components/products/makeup/face/pages/foundation';
import { Lips } from './components/products/makeup/lips/lips';
import { Gloss } from './components/products/makeup/lips/pages/gloss';
import { LipBalm } from './components/products/makeup/lips/pages/lip-balm';
import { LipPencil } from './components/products/makeup/lips/pages/lip-pencil';
import { LipStick } from './components/products/makeup/lips/pages/lipstick';
import { Nails } from './components/products/makeup/nails/nails';
import { NailBase } from './components/products/makeup/nails/pages/nail-base';
import { NailPolish } from './components/products/makeup/nails/pages/nail-polish';
import { TopCoat } from './components/products/makeup/nails/pages/top-coat';
import { Perfume } from './components/products/perfume/perfume';
import { ForMen } from './components/products/perfume/for-men/for-men';
import { EauDePerfume as ManEauDePerfume } from './components/products/perfume/for-men/pages/eau-de-perfume';
import {EauDeToilette as ManEauDeToilette} from './components/products/perfume/for-men/pages/eau-de-toilette';
import { ForWomen } from './components/products/perfume/for-women/for-women';
import {EauDePerfume as WomanEauDePerfume } from './components/products/perfume/for-women/pages/eau-de-perfume';
import {EauDeToilette as WomanEauDeToilette} from './components/products/perfume/for-women/pages/eau-de-toilette';
import { Skincare } from './components/products/skincare/skincare';
import { BodyCare } from './components/products/skincare/body-care/body-care';
import { BodyCream } from './components/products/skincare/body-care/pages/body-cream';
import { BodyOil } from './components/products/skincare/body-care/pages/body-oil';
import { FaceCare } from './components/products/skincare/face-care/face-care';
import { DayCream } from './components/products/skincare/face-care/pages/day-cream';
import { NightCream } from './components/products/skincare/face-care/pages/night-cream';
import { FaceMask } from './components/products/skincare/face-care/pages/face-mask';
import { FeetCare } from './components/products/skincare/feet-care/feet-care';
import { HandsCare } from './components/products/skincare/hands-care/hands-care';
import { AccessForbidden } from './components/access.forbidden/access.forbidden';
import ProtectedRoutes from './_auth/protected.routes';
import { useState } from 'react';

function App() {
  const [cartCount, setCartCount] = useState(0);

  return (
    <div className="App">
        <Router>
        <ProtectedRoutes  setCartCount={setCartCount}/>
          <Header cartCount={cartCount} setCartCount={setCartCount}/>
            <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/authenticate" element={<Login setCartCount={setCartCount}/>} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/view-product-details/:productId" element={<ViewProductDetails setCartCount={setCartCount}/>} />
              <Route path="/search-view/:key" element={<SearchView />} />
              <Route path="/accessForbidden" element={<AccessForbidden />} />
              <Route path="/bath" element={<Bath />}/>
              <Route path="/hair" element={<Hair />}/>
              <Route path="/make-up" element={<MakeUp />}/>
              <Route path="/perfume" element={<Perfume />}/>
              <Route path="/skin-care" element={<Skincare />}/>
              <Route path="/bath/bath-salt" element={<BathSalt />}/>
              <Route path="/bath/shower-gel" element={<ShowerGel />}/>
              <Route path="/bath/shower-oil" element={<ShowerOil />}/>
              <Route path="/bath/soap" element={<Soap />}/>
              <Route path="/hair/accesories" element={<Accesories />}/>
              <Route path="/hair/hair-care" element={<HairCare />}/>
              <Route path="/hair/styling" element={<Styling />}/>
              <Route path="/make-up/brushes" element={<Brushes />}/>
              <Route path="/make-up/eyebrows" element={<Eyebrows />}/>
              <Route path="/make-up/eyes" element={<Eyes />}/>
              <Route path="/make-up/face" element={<Face />}/>
              <Route path="/make-up/lips" element={<Lips />}/>
              <Route path="/make-up/nails" element={<Nails />}/>
              <Route path="/perfume/for-men" element={<ForMen />}/>
              <Route path="/perfume/for-women" element={<ForWomen />}/>
              <Route path="/skin-care/body-care" element={<BodyCare />}/>
              <Route path="/skin-care/face-care" element={<FaceCare />}/>
              <Route path="/skin-care/feet-care" element={<FeetCare />}/>
              <Route path="/skin-care/hands-care" element={<HandsCare />}/>
              <Route path="/hair/accesories/hair-brush" element={<HairBrush />}/>
              <Route path="/hair/accesories/hair-pins" element={<HairPins />}/>
              <Route path="/hair/accesories/hair-tie" element={<HairTie />}/>
              <Route path="/hair/hair-care/hair-balm" element={<HairBalm />}/>
              <Route path="/hair/hair-care/hair-mask" element={<HairMask />}/>
              <Route path="/hair/hair-care/hair-oil" element={<HairOil />}/>
              <Route path="/hair/hair-care/shampoo" element={<Shampoo />}/>
              <Route path="/hair/styling/hair-wax" element={<HairWax />}/>
              <Route path="/hair/styling/hair-spray" element={<HairSpray />}/>
              <Route path="/hair/styling/hair-gel" element={<HairGel />}/>
              <Route path="/make-up/eyebrows/eyebrows-pencil" element={<EyebrowsPencil />}/>
              <Route path="/make-up/eyebrows/eyebrows-gel" element={<EyebrowsGel />}/>
              <Route path="/make-up/eyes/eye-pencil" element={<EyePencil />}/>
              <Route path="/make-up/eyes/eyeliner" element={<Eyeliner />}/>
              <Route path="/make-up/eyes/lashes" element={<Lashes />}/>
              <Route path="/make-up/eyes/mascara" element={<Mascara />}/>
              <Route path="/make-up/eyes/palette" element={<Palette />}/>
              <Route path="/make-up/face/concealer" element={<Concelear />}/>
              <Route path="/make-up/face/face-powder" element={<FacePowder />}/>
              <Route path="/make-up/face/foundation" element={<Foundation />}/>
              <Route path="/make-up/lips/gloss" element={<Gloss />}/>
              <Route path="/make-up/lips/lip-balm" element={<LipBalm />}/>
              <Route path="/make-up/lips/lip-pencil" element={<LipPencil />}/>
              <Route path="/make-up/lips/lipstick" element={<LipStick />}/>
              <Route path="/make-up/nails/nail-base" element={<NailBase />}/>
              <Route path="/make-up/nails/nail-polish" element={<NailPolish />}/>
              <Route path="/make-up/nails/top-coat" element={<TopCoat />}/>
              <Route path="/perfume/for-men/eau-de-parfume" element={<ManEauDePerfume />}/>
              <Route path="/perfume/for-men/eau-de-toalette" element={<ManEauDeToilette />}/>
              <Route path="/perfume/for-women/eau-de-parfume" element={<WomanEauDePerfume />}/>
              <Route path="/perfume/for-women/eau-de-toalette" element={<WomanEauDeToilette />}/>
              <Route path="/skin-care/body-care/body-cream" element={<BodyCream />}/>
              <Route path="/skin-care/body-care/body-oil" element={<BodyOil />}/>
              <Route path="/skin-care/face-care/day-cream" element={<DayCream />}/>
              <Route path="/skin-care/face-care/night-cream" element={<NightCream />}/>
              <Route path="/skin-care/face-care/face-mask" element={<FaceMask />}/>
              <Route element={<AccessForbidden />} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
