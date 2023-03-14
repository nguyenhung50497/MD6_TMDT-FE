export default function Header() {
    return(
        <div className="row bg-light" >
            <div className="col-2">

            </div>
            <div id="carouselExampleIndicators" class="carousel slide col-8" data-ride="carousel">
                <ol class="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="5"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="6"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="7"></li>
                </ol>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img class="d-block w-100" src="/img/banner-1.png" style={{height: "300px", width: "100%"}} alt="1"/>
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src="/img/banner-2.png" style={{height: "300px", width: "100%"}} alt="2"/>
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src="/img/banner-3.png" style={{height: "300px", width: "100%"}} alt="3"/>
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src="/img/banner-4.png" style={{height: "300px", width: "100%"}} alt="4"/>
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src="/img/banner-5.png" style={{height: "300px", width: "100%"}} alt="5"/>
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src="/img/banner-6.png" style={{height: "300px", width: "100%"}} alt="6"/>
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src="/img/banner-7.png" style={{height: "300px", width: "100%"}} alt="7"/>
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src="/img/banner-8.png" style={{height: "300px", width: "100%"}} alt="8"/>
                    </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
            <div className="col-2">

            </div>
        </div>
    )
}