import React, {Component} from "react";
import './slider.css';
import './style.css';
import './navbar.css';

class NewComponent extends Component
{
	
	render() {
	  return (
		<div>
		  <meta name="viewport" content="width=device-width, initial-scale=1" />
		  <meta charSet="UTF-8" />
		  
		  <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" rel="stylesheet" />
		
		  <link href="style.css" rel="stylesheet" />
		  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
		  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
		  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
		  {/*TO BE INCLUDED EVERYWHERE*/}
		
		<div class="header">
			
			<div class="nav">
				
				<ul class="menu-bar">
				<img  src="https://www.pngarts.com/files/2/Letter-W-PNG-Image-Background.png" alt="logo" style={{maxWidth: 65 ,marginRight:'-50px' }} />
				
					<li>ebDoc</li>

					
					<li>
					<a  href="/frontpg" style={{color:"black"}}>Home</a>
					</li>
					<li>
					<a  href="/doctorspg" style={{color:"black"}}>Doctors Page</a>
					</li>
					<li>
					<a  href="/login" style={{color:"black"}}>Login</a>
					</li>

					</ul>
					
			</div>	

		</div>
		



		 {/* <nav className="navbar navbar-expand-lg navbar-light fixed-top">
			<div className="container">
			  <br />
			  <br />
			  <img src="https://n1.nextpng.com/sticker-png/623/966/sticker-png-cartoon-computer-logo-letter-w-alphabet-sort-blue-aqua-thumbnail.png" alt="logo" style={{maxWidth: 100}} />
			  <a className="navbar-brand" href="#" onmouseover="this.style.color='#cccccc' " onmouseout="this.style.color='#6aaf9d' ">EBDOC</a> <button aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" className="navbar-toggler" data-target="#navbarSupportedContent" data-toggle="collapse" type="button"><span className="navbar-toggler-icon" /></button>
			  <div className="collapse navbar-collapse" id="navbarSupportedContent">
				<ul className="navbar-nav ml-auto">
				  <li className="nav-item active">
					<h5><a className="nav-link" href="#" onmouseover="this.style.color='#cccccc' " onmouseout="this.style.color='#737373' ">Home</a></h5>
				  </li>
				  <li className="nav-item">
					<h5><a className="nav-link" href="#" onmouseover="this.style.color='#cccccc' " onmouseout="this.style.color='#737373'  ">About</a></h5>
				  </li>
				  <li className="nav-item">
					<h5><a className="nav-link" href="#" onmouseover="this.style.color='#cccccc' " onmouseout="this.style.color='#737373' ">Contact</a></h5>
				  </li>
				  <li className="nav-item">
					<h5><a className="nav-link" href="#" onmouseover="this.style.color='#cccccc' " onmouseout="this.style.color='#737373' ">Doctors Page</a></h5>
				  </li>
				  <li className="nav-item">
					<h5><a className="nav-link" href="/login" onmouseover="this.style.color='#cccccc' " onmouseout="this.style.color='#737373' ">Login</a></h5>
				  </li>
				</ul>
			  </div>
			</div>
	  </nav> */}
		  <div className="carousel slide" data-ride="carousel" id="carouselExampleIndicators">
			<ol className="carousel-indicators">
			  <li className="active" data-slide-to={0} data-target="#carouselExampleIndicators" />
			  <li data-slide-to={1} data-target="#carouselExampleIndicators" />
			  <li data-slide-to={2} data-target="#carouselExampleIndicators" />
			</ol>
			<div className="carousel-inner">
			  <div className="carousel-item active">
				<br />
				<br />
				<img alt="First slide" className="d-block w-100" src="https://www.sciencenewsforstudents.org/wp-content/uploads/2020/10/1030_LL_bones.jpg" />
				<div className="carousel-caption d-none d-md-block">
				  <h5>Bones</h5>
				  <p>Human body has total of 206 bones.Axial Skeleton has 80 bones and Appendicular Skeleton has 126 bones.</p>
				</div>
			  </div>
			  <div className="carousel-item">
				<br />
				<br />
				<img alt="Second slide" className="d-block w-100" src="https://assets.considerable.com/wp-content/uploads/2019/04/24170055/heart-beat-line-end-of-life-picture.jpg" />
				<div className="carousel-caption d-none d-md-block">
				  <h5>Heart Rate</h5>
				  <p>A normal resting heart rate for adults ranges from 60 to 100 beats per minute. Generally, a lower heart rate at rest implies more efficient heart function and better cardiovascular fitness. </p>
				</div>
			  </div>
			  <div className="carousel-item">
				<br />
				<br />
				<img alt="Third slide" className="d-block w-100" src="https://img.freepik.com/free-photo/close-up-patient-using-pulse-oximeter-isolated_260672-341.jpg?size=626&ext=jpg" />
				<div className="carousel-caption d-none d-md-block">
				  <h5>Pulse Oximeter</h5>
				  <p>A pulse oximeter is a device used to monitor the amount of oxygen carried in the body.Two wavelengths of light passes through the finger to measure your pulse rate and how much oxygen is in your system.</p>
				</div>
			  </div>
			</div><a className="carousel-control-prev" data-slide="prev" href="#carouselExampleIndicators" role="button"><span aria-hidden="true" className="carousel-control-prev-icon" /> <span className="sr-only">Previous</span></a> <a className="carousel-control-next" data-slide="next" href="#carouselExampleIndicators" role="button"><span aria-hidden="true" className="carousel-control-next-icon" /> <span className="sr-only">Next</span></a>
		  
		  </div>
		  
		 
		  {/* MAIN (Center website) */}
		  <div className="main">
			<br />
			<h2>Tips And Advices</h2>
			{/*
  <p>Resize the browser window to see the responsive effect.</p>
  */}
			{/* Portfolio Gallery Grid */}
			<div className="row">
			  <div className="column">
				<div className="content">
				  <img src="https://cdn-a.william-reed.com/var/wrbm_gb_food_pharma/storage/images/5/7/9/9/1159975-1-eng-GB/Study-identifies-quick-and-simple-test-for-salt-levels-in-food_wrbm_large.jpg" alt="Mountains" width= {300} height={165} />
				  <h3>Salt</h3>
				  <p>Consuming less salt is the best.Diets high in sodium increase blood pressure levels.High blood pressure damages the kidneys over time,and is a leading cause of kidney failure. </p>
				</div>
			  </div>
			  <div className="column">
				<div className="content">
				  <img src="https://i1.wp.com/billioncheers.com/blog/wp-content/uploads/2019/05/soaked-almonds.jpg?fit=700%2C467&ssl=1" alt="Lights" width= {300} height={165} />
				  <h3>Soaked Almonds</h3>
				  <p>Soak almonds in water for about six to eight hours.Next morning, drain the water,peel off the skin and have them fresh.Almonds peel contain Tanin which inhibits absorption.</p>
				</div>
			  </div>
			  <div className="column">
				<div className="content">
				  <img src="https://img1.mashed.com/img/gallery/heres-what-happens-when-you-drink-hot-water-every-day/intro-1588602917.jpg" alt="Nature" width={300} height={165} />
				  <h3>Hot Water</h3>
				  <p>Drinking hotwater can support skin and muscles.It helps the cells absorb nutrients and fight infections.Drinking hot water helps to break down food faster than drinking cold or warm water.</p>
				</div>
			  </div>
			  <div className="column">
				<div className="content">
				  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0cHb6YdLc66IkmVoCRFe3cPYWJhSLh6EXUw&usqp=CAU" alt="Mountains" width= {300} height={165} />
				  <h3>Exercise</h3>
				  <p>It can help prevent excess weight gain or help maintain weight loss.Physical activity you burn calories.Keeps your blood flowing smoothly,decreases your risk of cardiovascular diseases.</p>
				</div>
			  </div>
			  {/* END GRID */}
			</div>
			<br />
			<hr />
			<h2>Latest Updates</h2>
			<div className="content">
			  <img src="https://www.healthcareradius.in/public/images/2019/09/27/Lab2.jpg" alt="rtpcr" width= {1288} height={700} /><br /><br />
			  <h3>Reverse Transcriptase Polymerase Chain Reaction (RTPCR)</h3>
			  <p>PCR is used widely for carrying out molecular-based diagnostic tests. It is used to detect viruses responsible for diseases such as HIV, Ebola, African swine fever, foot-and-mouth disease etc.  RT-PCR test, and antigen tests (Serology) are two different types of tests carried out for the diagnosis of COVID-19. The Real-Time RT–PCR is suitable to detect the COVID-19 virus as it contains only Ribonucleic Acid. The full form of RT-PCR is Reverse Transcriptase Polymerase Chain Reaction. It is the most sensitive technique for mRNA detection. It quantifies the presence of a particular genetic material of the virus or any pathogen.
				Real-Time RT-PCR is loaded with fluorescent dyes as markers. Real-Time RT-PCR helps investigators, mainly scientists or virologists, to analyse the results without delay. RT-PCR test detects the COVID-19 virus after a nasopharyngeal swab is collected from a patient. It detects the virus even if the viral load is less. The major advantage of Real-Time RT-PCR is that it gives rapid results.</p>
			</div>
			<br />
			<br />
			<div className="content">
			  <img src="https://wallpapercave.com/wp/wp4953435.jpg" alt="brain" width= {1288} height={700}  /><br /><br />
			  <h3>Brain regions found where serotonin boots patience</h3>
			  <p>New research suggests that two areas of the brain work together in response to serotonin to promote the ability to wait patiently and practice impulse control. This finding may aid the development of targeted treatments for individuals who are less able to suppress impulsive and impatient behavior.As the saying goes, “Patience is considered a virtue.” However, for some people, this attribute is challenging to manage, causing issues with relationships, employment, finances, and educational pursuits.
				Well-documented research already exists on the relationship between serotonin — a neurochemical responsible for feelings of well-being — and social and emotional behaviors, including impulsivity.</p>
			</div>
			<br />
			<br />
			<div className="content">
			  <img src="https://cdn.cancercenter.com/-/media/ctca/images/others/blogs/2019/08-august/02-blog-stem-cells-l.jpg" alt="stemcells" width= {1288} height={700} /><br /><br />
			  <h3>Donor stem cell transplant can improve survival rates for older patients with MDS</h3>
			  <p>A new clinical trial offers the most compelling evidence to date that a donor stem cell transplant can improve survival rates for older patients with higher-risk myelodysplastic syndrome (MDS), Dana-Farber Cancer Institute investigators report at the virtual 62nd American Society of Hematology (ASH) Annual Meeting.
				Despite being the only current cure for MDS and widely used for younger patients, transplant generally hasn't been offered to older patients because it has not been proven beneficial in that population. The new trial, conducted by the Blood and Marrow Transplant Clinical Trials Network, is likely to change that, according to study leaders. Involving 384 patients at 34 medical centers across the U.S., the trial found that transplantation of hematopoietic stem cells from compatible donors nearly doubled the survival rate of patients age 50-75.</p>
			</div>
			{/* END MAIN */}
		  </div>
		  <br />
		  <hr />
		  <br />
		  <img src="https://www.pngarts.com/files/2/Letter-W-PNG-Image-Background.png" alt="logo" style={{maxWidth: 60}} />
		  <b>ebDoc</b> 
		  <br />
		  <p><i style={{fontSize: 24}} className="fa">&nbsp;</i><b>Address : &nbsp;</b>44A,Hasan Plaza,Bangalore,India</p>
		  <p><i style={{fontSize: 24}} className="fa">&nbsp;</i><b>Mobile: &nbsp;</b>+91 9768056780</p>
		  {/* Add font awesome icons */}
		  <a href="#" className="fa fa-facebook" />
		  <a href="#" className="fa fa-twitter" />
		  <a href="#" className="fa fa-google" />
		  <a href="#" className="fa fa-linkedin" />
		</div>
	  );
	}
  };
  export default NewComponent;