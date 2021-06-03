<template>
  <div class="navbar-sticky bg-white header">
    <div class="navigation-container">
      <div data-collapse="medium" data-animation="default" data-duration="400" role="banner" class="navbar-3 w-nav">
        <a href="https://lob.com" class="brand w-nav-brand">
          <img
            :src="LOB_ASSETS_URL+'/dashboard/navbar/lob-logo.svg'"
            width="95" alt="" class="image-pop">
          <img 
            :src="LOB_ASSETS_URL+'/dashboard/navbar/lob-logo-1260.png'"
            width="90"
            :srcset="LOB_ASSETS_URL+'/dashboard/navbar/lob-logo-500.png 500w,' +LOB_ASSETS_URL+'/dashboard/navbar/lob-logo-800.png 800w,' +LOB_ASSETS_URL+'/dashboard/navbar/lob-logo-1260.png 1260w'"
            sizes="100vw" alt="" class="image-pop hidden">
        </a>
        <nav v-if="session.user.id" class="brand-header">
          <div data-delay="0" data-hover="1" data-w-id="w-dropdown-toggle-2"
          class="nav-dropdown dropdownlinkmega w-dropdown w-dropdown-right resources" @mouseenter="showYourResourcesNav = true" @mouseleave="showYourResourcesNav = false" @click="toggleMobileNavs('resources')">
            <div 
              id="w-dropdown-toggle-2" aria-controls="w-dropdown-list-2"
              aria-haspopup="menu" aria-expanded="false" role="" 
              tabindex="0" style="outline: none;" 
              :class="['nav-link-4', 'w-dropdown-toggle', {'w--open': (!showMobileNav && showYourResourcesNav) || (showMobileNav && mobileNavs.resources)}]">
              <div class="row-2 no-wrap">
                <div>Resources</div>
                <img
                  :src="LOB_ASSETS_URL+'/dashboard/navbar/caret-down.svg'"
                  width="24" alt="" class="dropdown-icon">
              </div>
            </div>
            <nav 
              style="height: 0px;" 
              id="w-dropdown-list-2"
              aria-labelledby="w-dropdown-toggle-2" 
              :class="['dropdown-list-5', 'w-dropdown-list', {'w--open' : (!showMobileNav && showYourResourcesNav) || (showMobileNav && mobileNavs.resources)}]">
              <div class="dropdown-menu dropdownmega right-dropdown-menu">
                <div class="text-small-4 meganavtitle sentencecase no-border-top">Docs &amp; Resources</div>
                <div class="w-row">
                  <div class="w-col w-col-11">
                    <TopNavbarMenuItem
                      href="/assets/icons/icon-lookup.svg"
                      imageSource="/assets/icons/icon-lookup.svg"
                      small
                    > API Reference
                    </TopNavbarMenuItem>
                    <TopNavbarMenuItem
                      href="https://status.lob.com"
                      imageSource="/assets/icons/icon-status.svg"
                      small
                    > API Status
                    </TopNavbarMenuItem>
                    <TopNavbarMenuItem
                      href="https://support.lob.com/hc/en-us"
                      :imageSource="LOB_ASSETS_URL+'/dashboard/navbar/help.svg'"
                      small
                    > Help Center
                    </TopNavbarMenuItem>
                    <TopNavbarMenuItem
                      :href="LOB_URL+'/guides'"
                      :imageSource="LOB_ASSETS_URL+'/dashboard/navbar/guides.svg'"
                      small
                    > Guides
                    </TopNavbarMenuItem>
                    <TopNavbarMenuItem
                      :href="LOB_URL+'/template-gallery'"
                      :imageSource="LOB_ASSETS_URL+'/dashboard/navbar/template-gallery.svg'"
                      small
                    > Template Gallery
                    </TopNavbarMenuItem>
                    <TopNavbarMenuItem
                      :href="LOB_URL+'/product-updates'"
                      :imageSource="'/assets/icons/icon-announcement.svg'"
                      small
                    > Product Updates
                    </TopNavbarMenuItem>
                  </div>
                  <div class="w-col w-col-1"></div>
                </div>
              </div>
            </nav>
          </div>
          <div v-if="session.user.id" data-delay="0" data-hover="1" data-w-id="w-dropdown-toggle-2"
            class="nav-dropdown dropdownlinkmega w-dropdown w-dropdown-right user-info" @mouseenter="showYourDashboardNav = true" @mouseleave="showYourDashboardNav = false" @click="toggleMobileNavs('dashboard')">
            <div id="w-dropdown-toggle-2" aria-controls="w-dropdown-list-2"
              aria-haspopup="menu" aria-expanded="false" role="" tabindex="0" style="outline: none;" 
              :class="['nav-link-4', 'w-dropdown-toggle', {'w--open' : (!showMobileNav && showYourDashboardNav) || (showMobileNav && mobileNavs.dashboard)}]">
              <div class="row-2 no-wrap">
                <div>{{session.user.first_name}} {{session.user.last_name}}</div>
                <img
                  :src="LOB_ASSETS_URL+'/dashboard/navbar/caret-down.svg'"
                  width="24" alt="" class="dropdown-icon">
              </div>
            </div>
            <nav 
              style="height: 0px;" id="w-dropdown-list-2"
              aria-labelledby="w-dropdown-toggle-2" 
              :class="['dropdown-list-5', 'w-dropdown-list', {'w--open': (!showMobileNav && showYourDashboardNav) || (showMobileNav && mobileNavs.dashboard)}]">
              <div class="dropdown-menu dropdownmega right-dropdown-menu">
                <div class="w-row">
                  <div class="w-col w-col-11">
                    <div class="text-small-4 meganavtitle sentencecase no-border-top">Your Dashboard</div>
                    <TopNavbarMenuItem
                      :href="'dashboard.settings.main.account'"
                      :imageSource="LOB_ASSETS_URL+'/dashboard/navbar/settings.svg'"
                      small
                    > Settings
                    </TopNavbarMenuItem>
                    <TopNavbarMenuItem
                      :href="'logout'"
                      :imageSource="LOB_ASSETS_URL+'/dashboard/navbar/sign-out.svg'"
                      small
                    > Sign Out
                    </TopNavbarMenuItem>
                  </div>
                  <div class="w-col w-col-1"></div>
                </div>
              </div>
            </nav>
          </div>
        </nav>
        <nav v-if="!session.user.id" role="navigation" 
          :class="['nav-menu-wrapper-4', 'w-nav-menu', {'nav-menu-mobile-show': showMobileNav, 'nav-menu-mobile-hide': !showMobileNav}]">
          <div class="nav-links-wrapper">
            <div class="nav-links nav-links-1">

              <TopNavbarMenu
                  :showMobileNav="showMobileNav"
                  :mobileNavs="mobileNavs"
                  :LOB_ASSETS_URL="LOB_ASSETS_URL"
                  navKey="products"
                  title="Products"
                  @toggleMobileNavs="toggleMobileNavs('products')"
                  snug2
              >
                  <div class="text-small-4 meganavtitle sentencecase no-border-top">APIs</div>
                  <TopNavbarMenuItem
                    subtitle="Program and control direct mail just like email"
                    :href="LOB_URL+'/print-mail'"
                    :imageSource="LOB_ASSETS_URL+'/dashboard/navbar/print-mail.svg'"
                  > Print &amp; Mail 
                  </TopNavbarMenuItem>
                  <TopNavbarMenuItem
                    subtitle="Validate, clean, and standardize address data"
                    :href="LOB_URL+'/address-verification'"
                    :imageSource="LOB_ASSETS_URL+'/dashboard/navbar/address-verification.svg'"
                  > Address Verification 
                  </TopNavbarMenuItem>
                  
                  <div class="text-small-4 meganavtitle sentencecase">Partners</div>
                  <TopNavbarMenuItem
                    subtitle="Add personalized offline communications to your app"
                    :href="LOB_URL+'/partner-program'"
                    :imageSource="LOB_ASSETS_URL+'/dashboard/navbar/build.svg'"
                  > Build on Lob 
                  </TopNavbarMenuItem>
              </TopNavbarMenu>

              <TopNavbarMenu
                  :showMobileNav="showMobileNav"
                  :mobileNavs="mobileNavs"
                  :LOB_ASSETS_URL="LOB_ASSETS_URL"
                  title="Solutions"
                  navKey="solutions"
                  @toggleMobileNavs="toggleMobileNavs('solutions')"
              >
                <div class="w-row">
                  <div class="w-col w-col-6 w-col-stack">
                    <div class="text-small-4 meganavtitle sentencecase no-border-top">Industry</div>
                    <TopNavbarMenuItem
                      :href="LOB_URL+'/financial-services'"
                      :imageSource="LOB_ASSETS_URL+'/dashboard/navbar/finance.svg'"
                      small
                    > Financial Services 
                    </TopNavbarMenuItem>
                    <TopNavbarMenuItem
                      :href="LOB_URL+'/insurance'"
                      :imageSource="LOB_ASSETS_URL+'/dashboard/navbar/insurance.svg'"
                      small
                    > Insurance 
                    </TopNavbarMenuItem>
                    <TopNavbarMenuItem
                      :href="LOB_URL+'/healthcare'"
                      :imageSource="LOB_ASSETS_URL+'/dashboard/navbar/healthcare.svg'"
                      small
                    > Healthcare 
                    </TopNavbarMenuItem>
                    <TopNavbarMenuItem
                      :href="LOB_URL+'/retail'"
                      :imageSource="LOB_ASSETS_URL+'/dashboard/navbar/retail.svg'"
                      small
                    > Retail &amp; eCommerce 
                    </TopNavbarMenuItem>
                  </div>
                  <div class="w-col w-col-6 w-col-stack">
                    <div class="text-small-4 meganavtitle sentencecase">Role</div>
                    <TopNavbarMenuItem
                      :href="LOB_URL+'/product-managers'"
                      :imageSource="LOB_ASSETS_URL+'/dashboard/navbar/product-manager.svg'"
                      small
                    > Product Managers 
                    </TopNavbarMenuItem>
                    <TopNavbarMenuItem
                      :href="LOB_URL+'/developers'"
                      :imageSource="LOB_ASSETS_URL+'/dashboard/navbar/developer.svg'"
                      small
                    > Developers 
                    </TopNavbarMenuItem>
                    <TopNavbarMenuItem
                      :href="LOB_URL+'/marketers'"
                      :imageSource="LOB_ASSETS_URL+'/dashboard/navbar/marketer.svg'"
                      small
                    > Marketers 
                    </TopNavbarMenuItem>
                  </div>
                </div>
              </TopNavbarMenu>

              <TopNavbarMenu
                  :showMobileNav="showMobileNav"
                  :mobileNavs="mobileNavs"
                  :LOB_ASSETS_URL="LOB_ASSETS_URL"
                  title="Pricing"
                  navKey="pricing"
                  @toggleMobileNavs="toggleMobileNavs('pricing')"
                  snug
              >
                  <div class="text-small-4 meganavtitle sentencecase no-border-top">Pricing</div>
                  <TopNavbarMenuItem
                    :href="LOB_URL+'/pricing/print-mail'"
                    :imageSource="LOB_ASSETS_URL+'/dashboard/navbar/print-mail.svg'"
                    small
                  > Print &amp; Mail 
                  </TopNavbarMenuItem>
                  <TopNavbarMenuItem
                    :href="LOB_URL+'/pricing/address-verification'"
                    :imageSource="LOB_ASSETS_URL+'/dashboard/navbar/address-verification.svg'"
                    small
                  > Address Verification 
                  </TopNavbarMenuItem>
                  <TopNavbarMenuItem
                    :href="LOB_URL+'/pricing/premium-support'"
                    :imageSource="LOB_ASSETS_URL+'/dashboard/navbar/premium-support.svg'"
                    small
                  > Premium Support 
                  </TopNavbarMenuItem>
              </TopNavbarMenu>

              <a :href="LOB_URL+'/happy-customers'" class="nav-link-4 w-nav-link">
                Customers
              </a>

              <div data-delay="0" data-hover="1" data-w-id="w-dropdown-toggle-2"
                class="nav-dropdown dropdownlinkmega w-dropdown" @mouseenter="showDocsNav = true" @mouseleave="showDocsNav = false" @click="toggleMobileNavs('docs')">
                <div class="nav-link-4 w-dropdown-toggle" id="w-dropdown-toggle-2" aria-controls="w-dropdown-list-2"
                  aria-haspopup="menu" aria-expanded="false" role="" tabindex="0" style="outline: none;" :class="{ 'w--open' : (!showMobileNav && showDocsNav) || (showMobileNav && mobileNavs.docs) }">
                  <div class="row-2 no-wrap">
                    <div>Resources</div>
                    <img
                      :src="LOB_ASSETS_URL+'/dashboard/navbar/caret-down.svg'"
                      width="24" alt="" class="dropdown-icon">
                  </div>
                </div>
                <nav class="dropdown-list-5 w-dropdown-list" style="height: 0px;" id="w-dropdown-list-2"
                  aria-labelledby="w-dropdown-toggle-2" :class="{ 'w--open' : (!showMobileNav && showDocsNav) || (showMobileNav && mobileNavs.docs) }">
                  <div class="dropdown-menu dropdownmega">
                    <div class="w-row">
                      <div class="w-col w-col-6 w-col-stack">
                        <div class="text-small-4 meganavtitle sentencecase no-border-top">Docs &amp; Resources</div>
                        <TopNavbarMenuItem
                          :href="'https://docs.lob.com'"
                          :imageSource="'/assets/icons/icon-lookup.svg'"
                          small
                        > API Reference 
                        </TopNavbarMenuItem>
                        <TopNavbarMenuItem
                          :href="'https://status.lob.com'"
                          :imageSource="'/assets/icons/icon-status.svg'"
                          small
                        > API Status
                        </TopNavbarMenuItem>
                        <TopNavbarMenuItem
                          :href="LOB_URL+'/guides'"
                          :imageSource="LOB_ASSETS_URL+'/dashboard/navbar/guides.svg'"
                          small
                        > Guides
                        </TopNavbarMenuItem>
                        <TopNavbarMenuItem
                          :href="LOB_URL+'/template-gallery'"
                          :imageSource="LOB_ASSETS_URL+'/dashboard/navbar/template-gallery.svg'"
                          small
                        > Template Gallery
                        </TopNavbarMenuItem>
                        <TopNavbarMenuItem
                          :href="'https://support.lob.com/hc/en-us'"
                          :imageSource="LOB_ASSETS_URL+'/dashboard/navbar/help.svg'"
                          small
                        > Help Center
                        </TopNavbarMenuItem>
                      </div>
                      <div class="w-col w-col-6 w-col-stack">
                        <div class="text-small-4 meganavtitle sentencecase">Content &amp; Events</div>
                        <TopNavbarMenuItem
                          :href="LOB_URL+'/library'"
                          :imageSource="LOB_ASSETS_URL+'/dashboard/navbar/library.svg'"
                          small
                        > Library
                        </TopNavbarMenuItem>
                        <TopNavbarMenuItem
                          :href="LOB_URL+'/events'"
                          :imageSource="LOB_ASSETS_URL+'/dashboard/navbar/events.svg'"
                          small
                        > Events
                        </TopNavbarMenuItem>
                        <TopNavbarMenuItem
                          :href="LOB_URL+'/blog'"
                          :imageSource="LOB_ASSETS_URL+'/dashboard/navbar/blog.svg'"
                          small
                        > Blog
                        </TopNavbarMenuItem>
                      </div>
                    </div>
                  </div>
                </nav>
              </div>
              <div data-delay="0" data-hover="1" data-w-id="w-dropdown-toggle-3"
                class="nav-dropdown dropdownlinkmega w-dropdown" @mouseenter="showCompanyNav = true" @mouseleave="showCompanyNav = false" @click="toggleMobileNavs('company')">
                <div class="nav-link-4 no-border-bottom w-dropdown-toggle" id="w-dropdown-toggle-3"
                  aria-controls="w-dropdown-list-3" aria-haspopup="menu" aria-expanded="false" role="" tabindex="0"
                  style="outline: none;" :class="{ 'w--open' : (!showMobileNav && showCompanyNav) || (showMobileNav && mobileNavs.company) }">
                  <div class="row-2 no-wrap">
                    <div>Company</div>
                    <img
                      :src="LOB_ASSETS_URL+'/dashboard/navbar/caret-down.svg'"
                      width="24" alt="" class="dropdown-icon">
                  </div>
                </div>
                <nav 
                  style="height: 0px;" id="w-dropdown-list-3"
                  aria-labelledby="w-dropdown-toggle-3" 
                  :class="['dropdown-list-5', 'w-dropdown-list', {'w--open' : (!showMobileNav && showCompanyNav) || (showMobileNav && mobileNavs.company)}]">
                  <div class="dropdown-menu dropdownmega">
                    <div class="w-row">
                      <div class="w-col w-col-6 w-col-stack">
                        <div class="text-small-4 meganavtitle sentencecase no-border-top">About</div>
                        <TopNavbarMenuItem
                          :href="LOB_URL+'/about'"
                          :imageSource="LOB_ASSETS_URL+'/dashboard/navbar/about.svg'"
                          small
                        > About Lob
                        </TopNavbarMenuItem>
                        <TopNavbarMenuItem
                          :href="LOB_URL+'/careers'"
                          :imageSource="LOB_ASSETS_URL+'/dashboard/navbar/careers.svg'"
                          small
                        > Careers
                        </TopNavbarMenuItem>
                        <TopNavbarMenuItem
                          :href="'https://www.lob.org/'"
                          :imageSource="LOB_ASSETS_URL+'/dashboard/navbar/icon_heart.svg'"
                          small
                        > Lob.org
                        </TopNavbarMenuItem>
                      </div>
                      <div class="w-col w-col-6 w-col-stack">
                        <div class="text-small-4 meganavtitle sentencecase">Partners</div>
                        <TopNavbarMenuItem
                          :href="LOB_URL+'/partners'"
                          :imageSource="'/assets/icons/icon-partnership.svg'"
                          small
                        > Partnerships
                        </TopNavbarMenuItem>
                        <TopNavbarMenuItem
                          :href="LOB_URL+'/print-partner'"
                          :imageSource="'/assets/icons/icon-printer.svg'"
                          small
                        > Print Network
                        </TopNavbarMenuItem>
                      </div>
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>
          <div v-if="session.user.id" data-delay="0" data-hover="1" data-w-id="w-dropdown-toggle-2"
            class="nav-dropdown dropdownlinkmega w-dropdown w-dropdown-right user-info" @mouseenter="showYourDashboardNav = true" @mouseleave="showYourDashboardNav = false" @click="toggleMobileNavs('dashboard')">
            <div class="nav-link-4 w-dropdown-toggle" id="w-dropdown-toggle-2" aria-controls="w-dropdown-list-2"
              aria-haspopup="menu" aria-expanded="false" role="" tabindex="0" style="outline: none;" :class="{ 'w--open' : (!showMobileNav && showYourDashboardNav) || (showMobileNav && mobileNavs.dashboard) }">
              <div class="row-2 no-wrap">
                <div>{{session.user.first_name}} {{session.user.last_name}}</div>
                <img
                  :src="LOB_ASSETS_URL+'/dashboard/navbar/caret-down.svg'"
                  width="24" alt="" class="dropdown-icon">
              </div>
            </div>
            <nav class="dropdown-list-5 w-dropdown-list" style="height: 0px;" id="w-dropdown-list-2"
              aria-labelledby="w-dropdown-toggle-2" :class="{ 'w--open' : (!showMobileNav && showYourDashboardNav) || (showMobileNav && mobileNavs.dashboard) }">
              <div class="dropdown-menu dropdownmega right-dropdown-menu">
                <div class="w-row">
                  <div class="w-col w-col-11">
                    <div class="text-small-4 meganavtitle sentencecase no-border-top">Your Dashboard</div>
                    <TopNavbarMenuItem
                      :href="'dashboard.settings.main.account'"
                      :imageSource="LOB_ASSETS_URL+'/dashboard/navbar/settings.svg'"
                      small
                    > Settings
                    </TopNavbarMenuItem>
                    <TopNavbarMenuItem
                      :href="'logout'"
                      :imageSource="OB_ASSETS_URL+'/dashboard/navbar/sign-out.svg'"
                      small
                    > Sign Out
                    </TopNavbarMenuItem>
                  </div>
                  <div class="w-col w-col-1"></div>
                </div>
              </div>
            </nav>
          </div>
          <div @click="hideMobileNav" class="nav-functions-2 signup">
            <a v-if="!session.user.id" ui-sref="register" class="button-4 rebrand-btn-blue w-button">Sign up</a>
            <a v-else ui-sref="dashboard.settings.main.account" class="button-4 rebrand-btn-blue w-button">Settings</a>
          </div>
          <div  @click="hideMobileNav" class="nav-functions-2 login">
            <a v-if="!session.user.id" ui-sref="login" class="button-4 bg-gray-4 rebrand-btn-gray w-button">Log in</a>
            <a v-else ui-sref="logout" class="button-4 bg-gray-4 rebrand-btn-gray w-button">Sign Out</a>
          </div>
        </nav>
        <div v-if="!session.user.id" class="div-block-40">
          <a ui-sref="login" class="nav-link rebrand-btn-gray w-nav-link">Log in</a>
        </div>
        <div class="nav-menu-button-wrapper">
          <div class="nav-functions-2">
            <a v-if="!session.user.id" ui-sref="register" class="button-4 bg-gray-4 w-button">Sign up</a>
          </div>
          <div class="menu-button w-nav-button">
            <img
              :src="LOB_ASSETS_URL+'/dashboard/navbar/menu.svg'"
              alt="" class="menu-icon" @click="showMobileNav = true" v-if="!showMobileNav">
            <img :src="LOB_ASSETS_URL+'/dashboard/navbar/x.svg'"
              alt="" class="menu-cross-icon" @click="showMobileNav = false" v-if="showMobileNav">
          </div>
        </div>
        <div data-wf-ignore="" :class="['w-nav-overlay', { 'nav-menu-mobile-show': showMobileNav, 'nav-menu-mobile-hide': !showMobileNav }]"></div>
      </div>
    </div>
  </div>
</template>

<script>
import TopNavbarMenu from '../TopNavbarMenu'
import TopNavbarMenuItem from '../TopNavbarMenuItem'
export default {
  name: 'TopNavbar',
  components: {TopNavbarMenu, TopNavbarMenuItem},
  props: {
    loggedIn: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      LOB_URL: 'https://lob.com',
      LOB_ASSETS_URL: 'https://s3-us-west-2.amazonaws.com/public.lob.com',
      showMobileNav: false,
      showYourResourcesNav: false,
      showYourDashboardNav: false,
      showPricingNav: false,
      showSolutionsNav: false,
      showPricingNav: false,
      showDocsNav: false,
      showCompanyNav: false,
      mobileNavs: {
        products: false,
        solutions: false,
        pricing: false,
        company: false,
        dashboard: false,
        docs: false
      }
    }
  },
  computed: {
    session() {
      if (this.loggedIn) return {
        user: {
          id: 2,
          first_name: 'Test',
          last_name: 'User'
        }
      };
      return {
        user: {}
      }
    }
  },
  methods: {
    hideMobileNav() {
      this.showMobileNav = false;
    },
    toggleMobileNavs(key) {
      Object.keys(this.mobileNavs).forEach((nav) => {
        if (nav === key) {
          this.mobileNavs[nav] = !this.mobileNavs[nav];
        } else {
          this.mobileNavs[nav] = false;
        }
      });
    }
  }
}
</script>

<style scoped lang="scss">
@import 'https://s3-us-west-2.amazonaws.com/public.lob.com/lobdotcom/rebrand-nav-footer.min.css';
.navbar-sticky {
  left: 0px;
  background: #fff;
  border-bottom: 2px solid #EAF0F7;
  border-radius: 2px;
  position: fixed;
  width: 100%;

  .dropdown-menu {
    &.dropdownmega {
      padding: 20px !important;
    }
  }

  .navigation-container {
    max-width: none;

    @media (max-width: 700px) {
      padding: 0 15px;
    }
  }

  .w-nav-brand img {
    width: 72px;
    padding: 5px 0;
  }

  .w-nav-button {
    .menu-icon {
      display: none;
    }
  }

  .w-nav {
    padding: 19px 0;
  }
}

.navbar-sticky {
  .menu-icon,
  .menu-cross-icon {
    position: relative;
  }

  .menu-cross-icon {
    visibility: visible;
  }
}

.verification-menu {
  .extension {
    position: absolute;
    right: 0;

    .btn-xs {
      margin-right: 32px;
    }
  }
}

.verification-landing {
  position: relative;

  img.address-pointer {
    position: absolute;
    width: 65px;
    max-width: 12%;
    bottom: 15%;
    margin-top: 0;
    margin-left: 20px;
  }

  img.address-home {
    max-width: 350px;
    margin-top: 0;
  }
}
</style>
