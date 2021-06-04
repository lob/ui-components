<template>
  <div class="navbar-sticky bg-white header">
    <div class="navigation-container">
      <div
        data-collapse="medium"
        data-animation="default"
        data-duration="400"
        role="banner"
        class="navbar-3 w-nav"
      >
        <a
          href="https://lob.com"
          class="brand w-nav-brand"
        >
          <img
            :src="$getConst('lobAssetsUrl')+'/dashboard/navbar/lob-logo.svg'"
            width="95"
            alt=""
            class="image-pop"
          >
          <img
            :src="$getConst('lobAssetsUrl')+'/dashboard/navbar/lob-logo-1260.png'"
            width="90"
            :srcset="$getConst('lobAssetsUrl')+'/dashboard/navbar/lob-logo-500.png 500w,' +$getConst('lobAssetsUrl')+'/dashboard/navbar/lob-logo-800.png 800w,' +$getConst('lobAssetsUrl')+'/dashboard/navbar/lob-logo-1260.png 1260w'"
            sizes="100vw"
            alt=""
            class="image-pop hidden"
          >
        </a>
        <nav
          v-if="session.user.id"
          class="brand-header"
        >
          <div
            data-delay="0"
            data-hover="1"
            data-w-id="w-dropdown-toggle-2"
            class="nav-dropdown dropdownlinkmega w-dropdown w-dropdown-right resources"
            @mouseenter="showYourResourcesNav = true"
            @mouseleave="showYourResourcesNav = false"
            @click="toggleMobileNavs('resources')"
          >
            <div
              id="w-dropdown-toggle-2"
              aria-controls="w-dropdown-list-2"
              aria-haspopup="menu"
              aria-expanded="false"
              role=""
              tabindex="0"
              style="outline: none;"
              :class="['nav-link-4', 'w-dropdown-toggle', {'w--open': (!showMobileNav && showYourResourcesNav) || (showMobileNav && mobileNavs.resources)}]"
            >
              <div class="row-2 no-wrap">
                <div>Resources</div>
                <img
                  :src="$getConst('lobAssetsUrl')+'/dashboard/navbar/caret-down.svg'"
                  width="24"
                  alt=""
                  class="dropdown-icon"
                >
              </div>
            </div>
            <nav
              id="w-dropdown-list-2"
              style="height: 0px;"
              aria-labelledby="w-dropdown-toggle-2"
              :class="['dropdown-list-5', 'w-dropdown-list', {'w--open' : (!showMobileNav && showYourResourcesNav) || (showMobileNav && mobileNavs.resources)}]"
            >
              <div class="dropdown-menu dropdownmega right-dropdown-menu">
                <div class="text-small-4 meganavtitle sentencecase no-border-top">
                  Docs &amp; Resources
                </div>
                <div>
                  <div class="w-col w-col-11">
                    <MegaMenuItem
                      href="/assets/icons/icon-lookup.svg"
                      image-source="/assets/icons/icon-lookup.svg"
                      small
                    >
                      API Reference
                    </MegaMenuItem>
                    <MegaMenuItem
                      href="https://status.lob.com"
                      image-source="/assets/icons/icon-status.svg"
                      small
                    >
                      API Status
                    </MegaMenuItem>
                    <MegaMenuItem
                      href="https://support.lob.com/hc/en-us"
                      :image-source="$getConst('lobAssetsUrl')+'/dashboard/navbar/help.svg'"
                      small
                    >
                      Help Center
                    </MegaMenuItem>
                    <MegaMenuItem
                      :to="$getConst('lobUrl')+'/guides'"
                      :image-source="$getConst('lobAssetsUrl')+'/dashboard/navbar/guides.svg'"
                      small
                    >
                      Guides
                    </MegaMenuItem>
                    <MegaMenuItem
                      :to="$getConst('lobUrl')+'/template-gallery'"
                      :image-source="$getConst('lobAssetsUrl')+'/dashboard/navbar/template-gallery.svg'"
                      small
                    >
                      Template Gallery
                    </MegaMenuItem>
                    <MegaMenuItem
                      :to="$getConst('lobUrl')+'/product-updates'"
                      :image-source="'/assets/icons/icon-announcement.svg'"
                      small
                    >
                      Product Updates
                    </MegaMenuItem>
                  </div>
                  <div class="w-col w-col-1" />
                </div>
              </div>
            </nav>
          </div>
          <div
            v-if="session.user.id"
            data-delay="0"
            data-hover="1"
            data-w-id="w-dropdown-toggle-2"
            class="nav-dropdown dropdownlinkmega w-dropdown w-dropdown-right user-info"
            @mouseenter="showYourDashboardNav = true"
            @mouseleave="showYourDashboardNav = false"
            @click="toggleMobileNavs('dashboard')"
          >
            <div
              id="w-dropdown-toggle-2"
              aria-controls="w-dropdown-list-2"
              aria-haspopup="menu"
              aria-expanded="false"
              role=""
              tabindex="0"
              style="outline: none;"
              :class="['nav-link-4', 'w-dropdown-toggle', {'w--open' : (!showMobileNav && showYourDashboardNav) || (showMobileNav && mobileNavs.dashboard)}]"
            >
              <div class="row-2 no-wrap">
                <div>{{ session.user.first_name }} {{ session.user.last_name }}</div>
                <img
                  :src="$getConst('lobAssetsUrl')+'/dashboard/navbar/caret-down.svg'"
                  width="24"
                  alt=""
                  class="dropdown-icon"
                >
              </div>
            </div>
            <nav
              id="w-dropdown-list-2"
              style="height: 0px;"
              aria-labelledby="w-dropdown-toggle-2"
              :class="['dropdown-list-5', 'w-dropdown-list', {'w--open': (!showMobileNav && showYourDashboardNav) || (showMobileNav && mobileNavs.dashboard)}]"
            >
              <div class="dropdown-menu dropdownmega right-dropdown-menu">
                <div>
                  <div class="w-col w-col-11">
                    <div class="text-small-4 meganavtitle sentencecase no-border-top">
                      Your Dashboard
                    </div>
                    <MegaMenuItem
                      :to="'dashboard.settings.main.account'"
                      :image-source="$getConst('lobAssetsUrl')+'/dashboard/navbar/settings.svg'"
                      small
                    >
                      Settings
                    </MegaMenuItem>
                    <MegaMenuItem
                      :to="'logout'"
                      :image-source="$getConst('lobAssetsUrl')+'/dashboard/navbar/sign-out.svg'"
                      small
                    >
                      Sign Out
                    </MegaMenuItem>
                  </div>
                  <div class="w-col w-col-1" />
                </div>
              </div>
            </nav>
          </div>
        </nav>
        <nav
          v-if="!session.user.id"
          role="navigation"
          :class="['nav-menu-wrapper-4', 'w-nav-menu', {'nav-menu-mobile-show': showMobileNav, 'nav-menu-mobile-hide': !showMobileNav}]"
        >
          <div class="nav-links-wrapper">
            <div class="nav-links nav-links-1">
              <MegaMenu
                :show-mobile-nav="showMobileNav"
                :mobile-navs="mobileNavs"
                nav-key="products"
                title="Products"
                snug2
                @toggleMobileNavs="toggleMobileNavs('products')"
              >
                <div class="text-small-4 meganavtitle sentencecase no-border-top">
                  APIs
                </div>
                <MegaMenuItem
                  subtitle="Program and control direct mail just like email"
                  :to="$getConst('lobUrl')+'/print-mail'"
                  :image-source="$getConst('lobAssetsUrl')+'/dashboard/navbar/print-mail.svg'"
                >
                  Print &amp; Mail
                </MegaMenuItem>
                <MegaMenuItem
                  subtitle="Validate, clean, and standardize address data"
                  :to="$getConst('lobUrl')+'/address-verification'"
                  :image-source="$getConst('lobAssetsUrl')+'/dashboard/navbar/address-verification.svg'"
                >
                  Address Verification
                </MegaMenuItem>

                <div class="text-small-4 meganavtitle sentencecase">
                  Partners
                </div>
                <MegaMenuItem
                  subtitle="Add personalized offline communications to your app"
                  :to="$getConst('lobUrl')+'/partner-program'"
                  :image-source="$getConst('lobAssetsUrl')+'/dashboard/navbar/build.svg'"
                >
                  Build on Lob
                </MegaMenuItem>
              </MegaMenu>

              <MegaMenu
                :show-mobile-nav="showMobileNav"
                :mobile-navs="mobileNavs"
                title="Solutions"
                nav-key="solutions"
                @toggleMobileNavs="toggleMobileNavs('solutions')"
              >
                <div>
                  <div class="w-col w-col-6 w-col-stack">
                    <div class="text-small-4 meganavtitle sentencecase no-border-top">
                      Industry
                    </div>
                    <MegaMenuItem
                      :to="$getConst('lobUrl')+'/financial-services'"
                      :image-source="$getConst('lobAssetsUrl')+'/dashboard/navbar/finance.svg'"
                      small
                    >
                      Financial Services
                    </MegaMenuItem>
                    <MegaMenuItem
                      :to="$getConst('lobUrl')+'/insurance'"
                      :image-source="$getConst('lobAssetsUrl')+'/dashboard/navbar/insurance.svg'"
                      small
                    >
                      Insurance
                    </MegaMenuItem>
                    <MegaMenuItem
                      :to="$getConst('lobUrl')+'/healthcare'"
                      :image-source="$getConst('lobAssetsUrl')+'/dashboard/navbar/healthcare.svg'"
                      small
                    >
                      Healthcare
                    </MegaMenuItem>
                    <MegaMenuItem
                      :to="$getConst('lobUrl')+'/retail'"
                      :image-source="$getConst('lobAssetsUrl')+'/dashboard/navbar/retail.svg'"
                      small
                    >
                      Retail &amp; eCommerce
                    </MegaMenuItem>
                  </div>
                  <div class="w-col w-col-6 w-col-stack">
                    <div class="text-small-4 meganavtitle sentencecase">
                      Role
                    </div>
                    <MegaMenuItem
                      :to="$getConst('lobUrl')+'/product-managers'"
                      :image-source="$getConst('lobAssetsUrl')+'/dashboard/navbar/product-manager.svg'"
                      small
                    >
                      Product Managers
                    </MegaMenuItem>
                    <MegaMenuItem
                      :to="$getConst('lobUrl')+'/developers'"
                      :image-source="$getConst('lobAssetsUrl')+'/dashboard/navbar/developer.svg'"
                      small
                    >
                      Developers
                    </MegaMenuItem>
                    <MegaMenuItem
                      :to="$getConst('lobUrl')+'/marketers'"
                      :image-source="$getConst('lobAssetsUrl')+'/dashboard/navbar/marketer.svg'"
                      small
                    >
                      Marketers
                    </MegaMenuItem>
                  </div>
                </div>
              </MegaMenu>

              <MegaMenu
                :show-mobile-nav="showMobileNav"
                :mobile-navs="mobileNavs"
                title="Pricing"
                nav-key="pricing"
                snug
                @toggleMobileNavs="toggleMobileNavs('pricing')"
              >
                <div class="text-small-4 meganavtitle sentencecase no-border-top">
                  Pricing
                </div>
                <MegaMenuItem
                  :to="$getConst('lobUrl')+'/pricing/print-mail'"
                  :image-source="$getConst('lobAssetsUrl')+'/dashboard/navbar/print-mail.svg'"
                  small
                >
                  Print &amp; Mail
                </MegaMenuItem>
                <MegaMenuItem
                  :to="$getConst('lobUrl')+'/pricing/address-verification'"
                  :image-source="$getConst('lobAssetsUrl')+'/dashboard/navbar/address-verification.svg'"
                  small
                >
                  Address Verification
                </MegaMenuItem>
                <MegaMenuItem
                  :to="$getConst('lobUrl')+'/pricing/premium-support'"
                  :image-source="$getConst('lobAssetsUrl')+'/dashboard/navbar/premium-support.svg'"
                  small
                >
                  Premium Support
                </MegaMenuItem>
              </MegaMenu>

              <a
                :to="$getConst('lobUrl')+'/happy-customers'"
                class="nav-link-4 w-nav-link"
              >
                Customers
              </a>

              <MegaMenu
                :show-mobile-nav="showMobileNav"
                :mobile-navs="mobileNavs"
                nav-key="docs"
                title="Resources"
                @toggleMobileNavs="toggleMobileNavs('docs')"
              >
                <div class="w-col w-col-6 w-col-stack">
                  <div class="text-small-4 meganavtitle sentencecase no-border-top">
                    Docs &amp; Resources
                  </div>
                  <MegaMenuItem
                    :to="'https://docs.lob.com'"
                    :image-source="'/assets/icons/icon-lookup.svg'"
                    small
                  >
                    API Reference
                  </MegaMenuItem>
                  <MegaMenuItem
                    :to="'https://status.lob.com'"
                    :image-source="'/assets/icons/icon-status.svg'"
                    small
                  >
                    API Status
                  </MegaMenuItem>
                  <MegaMenuItem
                    :to="$getConst('lobUrl')+'/guides'"
                    :image-source="$getConst('lobAssetsUrl')+'/dashboard/navbar/guides.svg'"
                    small
                  >
                    Guides
                  </MegaMenuItem>
                  <MegaMenuItem
                    :to="$getConst('lobUrl')+'/template-gallery'"
                    :image-source="$getConst('lobAssetsUrl')+'/dashboard/navbar/template-gallery.svg'"
                    small
                  >
                    Template Gallery
                  </MegaMenuItem>
                  <MegaMenuItem
                    :to="'https://support.lob.com/hc/en-us'"
                    :image-source="$getConst('lobAssetsUrl')+'/dashboard/navbar/help.svg'"
                    small
                  >
                    Help Center
                  </MegaMenuItem>
                </div>
                <div class="w-col w-col-6 w-col-stack">
                  <div class="text-small-4 meganavtitle sentencecase">
                    Content &amp; Events
                  </div>
                  <MegaMenuItem
                    :to="$getConst('lobUrl')+'/library'"
                    :image-source="$getConst('lobAssetsUrl')+'/dashboard/navbar/library.svg'"
                    small
                  >
                    Library
                  </MegaMenuItem>
                  <MegaMenuItem
                    :to="$getConst('lobUrl')+'/events'"
                    :image-source="$getConst('lobAssetsUrl')+'/dashboard/navbar/events.svg'"
                    small
                  >
                    Events
                  </MegaMenuItem>
                  <MegaMenuItem
                    :to="$getConst('lobUrl')+'/blog'"
                    :image-source="$getConst('lobAssetsUrl')+'/dashboard/navbar/blog.svg'"
                    small
                  >
                    Blog
                  </MegaMenuItem>
                </div>
              </MegaMenu>
              <div
                data-delay="0"
                data-hover="1"
                data-w-id="w-dropdown-toggle-3"
                class="nav-dropdown dropdownlinkmega w-dropdown"
                @mouseenter="showCompanyNav = true"
                @mouseleave="showCompanyNav = false"
                @click="toggleMobileNavs('company')"
              >
                <div
                  id="w-dropdown-toggle-3"
                  class="nav-link-4 no-border-bottom w-dropdown-toggle"
                  aria-controls="w-dropdown-list-3"
                  aria-haspopup="menu"
                  aria-expanded="false"
                  role=""
                  tabindex="0"
                  style="outline: none;"
                  :class="{ 'w--open' : (!showMobileNav && showCompanyNav) || (showMobileNav && mobileNavs.company) }"
                >
                  <div class="row-2 no-wrap">
                    <div>Company</div>
                    <img
                      :src="$getConst('lobAssetsUrl')+'/dashboard/navbar/caret-down.svg'"
                      width="24"
                      alt=""
                      class="dropdown-icon"
                    >
                  </div>
                </div>
                <nav
                  id="w-dropdown-list-3"
                  style="height: 0px;"
                  aria-labelledby="w-dropdown-toggle-3"
                  :class="['dropdown-list-5', 'w-dropdown-list', {'w--open' : (!showMobileNav && showCompanyNav) || (showMobileNav && mobileNavs.company)}]"
                >
                  <div class="dropdown-menu dropdownmega">
                    <div>
                      <div class="w-col w-col-6 w-col-stack">
                        <div class="text-small-4 meganavtitle sentencecase no-border-top">
                          About
                        </div>
                        <MegaMenuItem
                          :to="$getConst('lobUrl')+'/about'"
                          :image-source="$getConst('lobAssetsUrl')+'/dashboard/navbar/about.svg'"
                          small
                        >
                          About Lob
                        </MegaMenuItem>
                        <MegaMenuItem
                          :to="$getConst('lobUrl')+'/careers'"
                          :image-source="$getConst('lobAssetsUrl')+'/dashboard/navbar/careers.svg'"
                          small
                        >
                          Careers
                        </MegaMenuItem>
                        <MegaMenuItem
                          :to="'https://www.lob.org/'"
                          :image-source="$getConst('lobAssetsUrl')+'/dashboard/navbar/icon_heart.svg'"
                          small
                        >
                          Lob.org
                        </MegaMenuItem>
                      </div>
                      <div class="w-col w-col-6 w-col-stack">
                        <div class="text-small-4 meganavtitle sentencecase">
                          Partners
                        </div>
                        <MegaMenuItem
                          :to="$getConst('lobUrl')+'/partners'"
                          :image-source="'/assets/icons/icon-partnership.svg'"
                          small
                        >
                          Partnerships
                        </MegaMenuItem>
                        <MegaMenuItem
                          :to="$getConst('lobUrl')+'/print-partner'"
                          :image-source="'/assets/icons/icon-printer.svg'"
                          small
                        >
                          Print Network
                        </MegaMenuItem>
                      </div>
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>
          <div
            v-if="session.user.id"
            data-delay="0"
            data-hover="1"
            data-w-id="w-dropdown-toggle-2"
            class="nav-dropdown dropdownlinkmega w-dropdown w-dropdown-right user-info"
            @mouseenter="showYourDashboardNav = true"
            @mouseleave="showYourDashboardNav = false"
            @click="toggleMobileNavs('dashboard')"
          >
            <div
              id="w-dropdown-toggle-2"
              class="nav-link-4 w-dropdown-toggle"
              aria-controls="w-dropdown-list-2"
              aria-haspopup="menu"
              aria-expanded="false"
              role=""
              tabindex="0"
              style="outline: none;"
              :class="{ 'w--open' : (!showMobileNav && showYourDashboardNav) || (showMobileNav && mobileNavs.dashboard) }"
            >
              <div class="row-2 no-wrap">
                <div>{{ session.user.first_name }} {{ session.user.last_name }}</div>
                <img
                  :src="$getConst('lobAssetsUrl')+'/dashboard/navbar/caret-down.svg'"
                  width="24"
                  alt=""
                  class="dropdown-icon"
                >
              </div>
            </div>
            <nav
              id="w-dropdown-list-2"
              class="dropdown-list-5 w-dropdown-list"
              style="height: 0px;"
              aria-labelledby="w-dropdown-toggle-2"
              :class="{ 'w--open' : (!showMobileNav && showYourDashboardNav) || (showMobileNav && mobileNavs.dashboard) }"
            >
              <div class="dropdown-menu dropdownmega right-dropdown-menu">
                <div>
                  <div class="w-col w-col-11">
                    <div class="text-small-4 meganavtitle sentencecase no-border-top">
                      Your Dashboard
                    </div>
                    <MegaMenuItem
                      :to="'dashboard.settings.main.account'"
                      :image-source="$getConst('lobAssetsUrl')+'/dashboard/navbar/settings.svg'"
                      small
                    >
                      Settings
                    </MegaMenuItem>
                    <MegaMenuItem
                      :to="'logout'"
                      :image-source="OB_ASSETS_URL+'/dashboard/navbar/sign-out.svg'"
                      small
                    >
                      Sign Out
                    </MegaMenuItem>
                  </div>
                  <div class="w-col w-col-1" />
                </div>
              </div>
            </nav>
          </div>
          <div
            class="nav-functions-2 signup"
            @click="hideMobileNav"
          >
            <a
              v-if="!session.user.id"
              ui-sref="register"
              class="button-4 rebrand-btn-blue w-button"
            >Sign up</a>
            <a
              v-else
              ui-sref="dashboard.settings.main.account"
              class="button-4 rebrand-btn-blue w-button"
            >Settings</a>
          </div>
          <div
            class="nav-functions-2 login"
            @click="hideMobileNav"
          >
            <a
              v-if="!session.user.id"
              ui-sref="login"
              class="button-4 bg-gray-4 rebrand-btn-gray w-button"
            >Log in</a>
            <a
              v-else
              ui-sref="logout"
              class="button-4 bg-gray-4 rebrand-btn-gray w-button"
            >Sign Out</a>
          </div>
        </nav>
        <div
          v-if="!session.user.id"
          class="div-block-40"
        >
          <a
            ui-sref="login"
            class="nav-link rebrand-btn-gray w-nav-link"
          >Log in</a>
        </div>
        <div class="nav-menu-button-wrapper">
          <div class="nav-functions-2">
            <a
              v-if="!session.user.id"
              ui-sref="register"
              class="button-4 bg-gray-4 w-button"
            >Sign up</a>
          </div>
          <div class="menu-button w-nav-button">
            <img
              v-if="!showMobileNav"
              :src="$getConst('lobAssetsUrl')+'/dashboard/navbar/menu.svg'"
              alt=""
              class="menu-icon"
              @click="showMobileNav = true"
            >
            <img
              v-if="showMobileNav"
              :src="$getConst('lobAssetsUrl')+'/dashboard/navbar/x.svg'"
              alt=""
              class="menu-cross-icon"
              @click="showMobileNav = false"
            >
          </div>
        </div>
        <div
          data-wf-ignore=""
          :class="['w-nav-overlay', { 'nav-menu-mobile-show': showMobileNav, 'nav-menu-mobile-hide': !showMobileNav }]"
        />
      </div>
    </div>
  </div>
</template>

<script>
import MegaMenu from '../MegaMenu';
import MegaMenuItem from '../MegaMenu/MegaMenuItem';
export default {
  name: 'Mega',
  components: { MegaMenu, MegaMenuItem },
  props: {
    loggedIn: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showMobileNav: false,
      showYourResourcesNav: false,
      showYourDashboardNav: false,
      showPricingNav: false,
      showSolutionsNav: false,
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
    };
  },
  computed: {
    session () {
      if (this.loggedIn) {
        return {
          user: {
            id: 2,
            first_name: 'Test',
            last_name: 'User'
          }
        };
      }
      return {
        user: {}
      };
    }
  },
  methods: {
    hideMobileNav () {
      this.showMobileNav = false;
    },
    toggleMobileNavs (key) {
      Object.keys(this.mobileNavs).forEach((nav) => {
        if (nav === key) {
          this.mobileNavs[nav] = !this.mobileNavs[nav];
        } else {
          this.mobileNavs[nav] = false;
        }
      });
    }
  }
};
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
