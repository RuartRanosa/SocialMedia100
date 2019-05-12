class Landing extends Component {
    constructor(){
        super()
        this.state = {
            posts:[],
            friends: []        }
        this.getData = this.getData.bind(this)
    }

    componentDidMount(){
        this.getData()
    }


     getData() {
        
    }


    render(){
      
      {/*
        const data = this.state.user
        const items = data.map((i) => <li key = {i.userId}>
        Username: {i.username}
        Admin Access: {i.adminAccess}
        Display Name: {i.displayName}
      </li>)
      */}
{/*
      <div className="App">
        <header className="App-header">
          <div className="clogo">
            <img src={logo} className="logopic" /> 
          </div>
            <SearchShop/>
          </header>
        </div>
*/}
      return (  
        <div className="">
          <header className="App-header">
            <body className="App-body">
              <article className="slideshow">
                <article className="pictures">
                  <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner">
                      <div class="carousel-item active">
                        <img class="d-block w-100" src={pic2} alt="First slide" className="pic2"/>
                      </div>
                      <div class="carousel-item">
                        <img class="d-block w-100" src={pic3} alt="Second slide" className="pic2"/>
                      </div>
                      <div class="carousel-item">
                        <img class="d-block w-100" src={pic1} alt="Third slide" className="pic2"/>
                      </div>
                    </div>
                  <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                  </a>
                  <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                  </a>
                  </div> 
                </article>
                <article className="csearch-bars">
                  <h2 className="sTitle">Eatwise - Elbi Food Establishment Companion</h2>
                  <SearchShop/>
                </article>
              </article>
              <div className="bottom-side">
              .
              </div>
              <div className="bottom-part">

              <div className="bottom-text"> Featured Restaurants </div>
              <div className="bottom-subtext"> These are the top picked restaurants for the week </div>
              <table className="table-bottom">
                <tr>
                  <td> <img src={pic1} className="thumbnail"/> </td>
                  <td className="cell-text"> Mcdonalds <br/> <small className="bottom-subtext"> Location: Vega Center </small> </td>
                  <td> <img src={pic2} className="thumbnail"/> </td>
                  <td className="cell-text"> Jollibee <br/> <small className="bottom-subtext"> Location: Lopez Avenue </small> </td>
                  <td> <img src={pic3} className="thumbnail"/> </td>
                  <td className="cell-text"> KFC <br/> <small className="bottom-subtext"> Location: Vega Arcade </small>  </td>
                </tr>
              </table>
              </div>
              <div className="bottom-side">
              .
              </div>
            </body>
          </header>
        </div>
      );         
    }
}

export default Landing
