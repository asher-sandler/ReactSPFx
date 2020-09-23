import * as React from 'react';
import styles from './AsWpReact.module.scss';
import { IAsWpReactProps } from './IAsWpReactProps';
//import { escape } from '@microsoft/sp-lodash-subset';
import {
  List, ListItem,ListItemContent,Cell } from 'react-mdl';

export default class AsWpReact extends React.Component<IAsWpReactProps, {}> {
  public  constructor(props) {
    super(props);

    this.state = {
        date: '',
        rates: {}

    }

    this.getRate();
}

getRate = () => {
  fetch('https://api.exchangeratesapi.io/latest?base=USD')
      .then(data => {
          return (data.json());
      })
      .then(data => {
          //console.log(data);
          this.setState({ date: data.date });
          this.setState({ rates: data.rates });

      })
}
// ***************************************************************************
currencyContent = (st) => {

     return (<div>

   <List className="jo-list">
   {

    Object.keys(st.rates).map((elem,idx) =>(
           this.outEl(st.rates[elem],elem ,idx )

                 )
             )
   }
   </List>
     </div>)
 }

// ***************************************************************************
 outEl = (rate,country,idx)=>{

   let flaUrl:string = 'https://www.countryflags.io/'+country.substr(0,2)+'/shiny/64.png';

	let ret :any = "";
		ret= (
		<ListItem key={idx} threeLine className="jo-listitem">
			<ListItemContent   className="jo-location">

	<div>
          <img src={flaUrl} alt={country} title={country} />
            <h4>{country}</h4>
            <h4>{rate.toFixed(3)}</h4>
	</div>
	<hr />

			</ListItemContent>

		</ListItem>
		)
	return ret;
}

// ***************************************************************************

banner = (st) => {
  let ret: any;
  ret =<h3>Currencies Rate by Country on {st.date} for 1 USD</h3>
  return ret;
}
// ***************************************************************************
  public render(): React.ReactElement<IAsWpReactProps> {

    return (
      <div className={ styles.asWpReact }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Asher Sandler !</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.subTitle }>SPFx with React JS</p>

                {this.banner(this.state)}
                <div style={{height: '600px',  overflowY:'scroll',  backgroundColor: '#0e87af'}}>

                  <Cell col={12}>
						      <div className="content">
                    {this.currencyContent(this.state)}
                  </div>
                </Cell>

              </div>


            </div>
          </div>
        </div>
      </div>
    );
  }
}
