<script>
export default {
    name: 'AppFooter',
    data() {
        return {
            joinUs: [
                { name: 'Careers' },
                { name: 'Restaurants' },
                { name: 'Become a Courier' }
            ],
            contactUs: [
                { name: 'Help Center' },
                { name: 'Support' },
                { name: 'Contacts' }
            ],
            Socials: [
                { name: 'Twitter' },
                { name: 'Facebook' },
                { name: 'Instagram' }
            ],
            privacy: [
                { name: 'Privacy Policy' },
                { name: 'Terms & Conditions' },
                { name: 'Cookies Policy' }
            ]
        }
    }
}
</script>

<template>
    <footer class="p-4 pb-4">
        <div class="footer-top">
            <div class="row">
                <!-- logo section -->
                <div class="logo-container pt-4">
                    <img src="../assets/images/deliveboo-logo2.svg" alt="Logo" class="logo">
                </div>

                <div class="footer-list">
                    <div class="footer-nav pt-4">
                        <h2 class="m-0">Join us</h2>
                        <ul>
                            <li v-for="list in joinUs">
                                <a href="">{{ list.name }}</a>
                            </li>
                        </ul>
                    </div>

                    <div class="footer-nav pt-4">
                        <h2 class="m-0">Contact Us</h2>
                        <ul>
                            <li v-for="list in contactUs">
                                <a href="">{{ list.name }}</a>
                            </li>
                        </ul>
                    </div>


                    <div class="footer-nav pt-4">
                        <h2 class="m-0">Follow us</h2>
                        <ul>
                            <li v-for="list in Socials">
                                <a href="">{{ list.name }}</a>
                            </li>
                        </ul>
                    </div>


                    <div class="footer-nav pt-4">
                        <h2 class="m-0">Download our app</h2>
                        <div class="download">
                            <div class="button d-flex align-items-center ms-0 justify-content-center">
                                <i class="fa-brands fa-apple fa-2xl"></i>
                                <div class="text">
                                    <h4 class="m-0">App Store</h4>
                                </div>
                            </div>
                            <div class="button d-flex align-items-center ms-0 justify-content-center">
                                <i class="fa-brands fa-google-play fa-xl"></i>
                                <div class="text">
                                    <h4 class="m-0">Google Play</h4>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <!-- joinUs -->
            </div>

            
        </div>
        
        <hr class="my-5">

        <div class="footer-bottom">
            <div class="row">

                <h3 class="m-0 copyrigth">@ All rights reserved. Made by DeliveBoo</h3>
                <ul>
                    <li v-for="list in privacy">
                        <a href="" class="text-decoration-none">{{ list.name }}</a>
                    </li>
                </ul>

            </div>
        </div>
    </footer>
</template>

<style lang="scss" scoped>

// Mobile first
footer {
    background-color: #2f2626;

    .footer-top {
        width: 75%;
        margin: auto;

        .logo-container {
            display: flex;
            align-items: flex-start;
            justify-content: center;

            .logo {
                width: 75%;
            }
        }

        .footer-list {
            .footer-nav {
                text-align: center;

                h2 {
                    font-size: 1.2rem;
                    padding-bottom: 16px;
                    color: #ffffff;
                }

                ul {
                    list-style-type: none;
                    margin: 0;
                    padding: 0;

                    a {
                        font-size: 1rem;
                        text-decoration: none;
                        color: grey;
                    }
                }

                ul li a:hover {
                    color: #ffffff;
                }

                .download {
                    .button {
                        padding: 15px;
                        border-radius: 10px;
                        border: 1px solid #ffffff;
                        margin: 0.9rem;
                        background-color: #ffffff00;

                        i {
                            color: #ffffff;
                            padding-right: 15px;
                        }

                        p {
                            font-size: 1rem;
                            color: grey;
                        }

                        h4 {
                            font-size: 1.2rem;
                            color: #ffffff;
                        }

                        &:hover {
                            cursor: pointer;
                            transform: scale(1.1);
                            box-shadow: 0 10px 15px rgba(0, 0, 0, 0.5);
                        }
                    }
                }
            }
        }
    }


    hr {
        color: #ffffff;
    }

    .footer-bottom {
        width: 75%;
        margin: auto;

        .copyrigth {
            text-align: center;
            font-size: 1rem;
            color: grey;
            padding-bottom: 0.5rem;
        }

        ul {

            list-style-type: none;
            display: flex;
            justify-content: space-around;
            align-items: center;

            gap: 0.8rem;

            li {
                text-align: center;
                font-size: 0.8rem;

                a {
                    color: grey
                }
            }
        }
    }
}

// Responsive Tablet
@media screen and (min-width: 768px) {
    .footer-top {
        width: 75%;
        margin: auto;

        .logo-container {
            margin: auto;
            padding-bottom: 1.5rem;
            width: 75%;
            display: flex;
            align-items: flex-start;
            justify-content: center;

            .logo {
                width: 75%;
            }
        }

        .footer-list {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;

            .footer-nav {
                width: 45%;
                text-align: center;
            }
        }
    }

    .footer-bottom {
        width: 75%;
        margin: auto;


        .row{
            display: flex;
            .copyrigth {
                width: 50%;
            }
        }

        ul {
            width: 50%;
        }
    }
}


// Responsive Desktop
@media screen and (min-width: 992px) {
    footer {
        .footer-top {
            width: 90%;
            margin: auto;
            display: flex;
    
            .logo-container {
                margin: 0;
                padding-bottom: 1.5rem;
                width: 25%;
    
                .logo {
                    width: 100%;
                }
            }
    
            .footer-list {
                width: 75%;
                display: flex;
    
                .footer-nav {
                    width: 22%;
                    text-align: center;
                }
            }
        }
    
        .footer-bottom {
            width: 75%;
            margin: auto;
    
    
            .row{
                display: flex;
                .copyrigth {
                    width: 50%;
                }
            }
    
            ul {
                width: 50%;
            }
        }
    }
}

</style>