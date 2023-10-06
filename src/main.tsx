import { FC, StrictMode, useState } from 'react';
import ReactDOM from 'react-dom/client';

interface Param {
   id: number;
   name: string;
}
interface ParamValue {
   paramId: number;
   value: string;
}
interface Model {
   paramValues: ParamValue[];
}
interface Props {
   params: Param[];
   model: Model;
}
const data: Props = {
   params: [
      { id: 1, name: 'Назначение' },
      { id: 2, name: 'Длина' },
   ],
   model: {
      paramValues: [
         { paramId: 1, value: 'Повседневное' },
         { paramId: 2, value: 'Макси' },
      ],
   },
};

const App: FC<Props> = ({ params, model }) => {
   const [param, setParam] = useState(model.paramValues);

   return (
      <div
         style={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: '16px',
            width: '100vw',
            height: '100vh',
            alignItems: 'center',
            justifyContent: 'center',
         }}>
         {params.map((el) => (
            <label style={{ display: 'flex', columnGap: '10px' }} key={el.id}>
               <span>{el.name}</span>
               {param.map((value) =>
                  value.paramId === el.id ? (
                     <input
                        key={value.paramId}
                        value={value.value}
                        onChange={(e) =>
                           setParam((prev) =>
                              prev.map((item) =>
                                 item.paramId === el.id ? { ...item, value: e.target.value } : item,
                              ),
                           )
                        }
                     />
                  ) : null,
               )}
            </label>
         ))}
      </div>
   );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <App {...data} />
   </StrictMode>,
);
