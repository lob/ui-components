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
        <nav v-if="showDashboardRedesign && session.user.id" class="brand-header">
          <div data-delay="0" data-hover="1" data-w-id="w-dropdown-toggle-2"
          class="nav-dropdown dropdownlinkmega w-dropdown w-dropdown-right resources" @mouseenter="showYourResourcesNav = true" @mouseleave="showYourResourcesNav = false" @click="toggleMobileNavs('resources')">
            <div class="nav-link-4 w-dropdown-toggle" id="w-dropdown-toggle-2" aria-controls="w-dropdown-list-2"
              aria-haspopup="menu" aria-expanded="false" role="" tabindex="0" style="outline: none;" 
              :class="{ 'w--open': (!showMobileNav && showYourResourcesNav) || (showMobileNav && mobileNavs.resources) }">
              <div class="row-2 no-wrap">
                <div>Resources</div>
                <img
                  :src="LOB_ASSETS_URL+'/dashboard/navbar/caret-down.svg'"
                  width="24" alt="" class="dropdown-icon">
              </div>
            </div>
            <nav class="dropdown-list-5 w-dropdown-list" style="height: 0px;" id="w-dropdown-list-2"
              aria-labelledby="w-dropdown-toggle-2" :class="{ 'w--open' : (!showMobileNav && showYourResourcesNav) || (showMobileNav && mobileNavs.resources) }">
              <div class="dropdown-menu dropdownmega right-dropdown-menu">
                <div class="text-small-4 meganavtitle sentencecase no-border-top">Docs &amp; Resources</div>
                <div class="w-row">
                  <div class="w-col w-col-11">
                    <div class="megadropdown-row small">
                      <a href="https://docs.lob.com" class="w-inline-block" target="_blank"
                        tabindex="0" style="outline: none;">
                        <img
                          src="/assets/icons/icon-lookup.svg"
                          alt="Icon lookup" class="megaicon small">
                      </a>
                      <div class="megalinksub-2 nobottom">
                        <a href="https://docs.lob.com"
                          target="_blank"
                          class="dropdown-link-2 megalink nobottomtext w-dropdown-link" tabindex="0"
                          style="outline: none;">
                          API Reference
                        </a>
                      </div>
                    </div>
                    <div class="megadropdown-row small">
                      <a href="https://status.lob.com" class="w-inline-block" target="_blank"
                        tabindex="0" style="outline: none;">
                        <img
                          src="/assets/icons/icon-status.svg"
                          alt="" class="megaicon small">
                      </a>
                      <div class="megalinksub-2 nobottom">
                        <a href="https://status.lob.com"
                          target="_blank"
                          class="dropdown-link-2 megalink nobottomtext w-dropdown-link" tabindex="0"
                          style="outline: none;">
                          API Status
                        </a>
                      </div>
                    </div>
                    <div class="megadropdown-row small">
                      <a href="https://support.lob.com/hc/en-us" target="_blank" class="w-inline-block" tabindex="0"
                        style="outline: none;">
                        <img
                          :src="LOB_ASSETS_URL+'/dashboard/navbar/help.svg'"
                          alt="" class="megaicon small">
                      </a>
                      <div class="megalinksub-2 nobottom">
                        <a href="https://support.lob.com/hc/en-us" target="_blank"
                          class="dropdown-link-2 megalink nobottomtext w-dropdown-link" tabindex="0"
                          style="outline: none;">
                          Help Center
                        </a>
                      </div>
                    </div>
                    <div class="megadropdown-row small">
                      <a :href="LOB_URL+'/guides'" target="_blank" class="w-inline-block" tabindex="0"
                        style="outline: none;">
                        <img
                          :src="LOB_ASSETS_URL+'/dashboard/navbar/guides.svg'"
                          alt="" class="megaicon small">
                      </a>
                      <div class="megalinksub-2 nobottom">
                        <a :href="LOB_URL+'/guides'"
                          target="_blank"
                          class="dropdown-link-2 megalink nobottomtext w-dropdown-link" tabindex="0"
                          style="outline: none;">
                          Guides
                        </a>
                      </div>
                    </div>
                    <div class="megadropdown-row small">
                      <a :href="LOB_URL+'/template-gallery'" target="_blank" class="w-inline-block" tabindex="0"
                        style="outline: none;">
                        <img
                          :src="LOB_ASSETS_URL+'/dashboard/navbar/template-gallery.svg'"
                          alt="" class="megaicon small">
                      </a>
                      <div class="megalinksub-2 nobottom">
                        <a :href="LOB_URL+'/template-gallery'"
                          target="_blank"
                          class="dropdown-link-2 megalink nobottomtext w-dropdown-link" tabindex="0"
                          style="outline: none;">Template Gallery</a>
                      </div>
                    </div>
                    <div class="megadropdown-row small">
                      <a :href="LOB_URL+'/product-updates'" target="_blank" class="w-inline-block" tabindex="0"
                        style="outline: none;">
                        <img
                          src="/assets/icons/icon-announcement.svg"
                          alt="" class="megaicon small">
                      </a>
                      <div class="megalinksub-2 nobottom">
                        <a :href="LOB_URL+'/product-updates'"
                          target="_blank"
                          class="dropdown-link-2 megalink nobottomtext w-dropdown-link" tabindex="0"
                          style="outline: none;">Product Updates</a>
                      </div>
                    </div>
                  </div>
                  <div class="w-col w-col-1"></div>
                </div>
              </div>
            </nav>
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
                    <div class="megadropdown-row small">
                      <a ui-sref="dashboard.settings.main.account" class="w-inline-block" tabindex="0"
                        style="outline: none;">
                        <img
                          :src="LOB_ASSETS_URL+'/dashboard/navbar/settings.svg'"
                          alt="" class="megaicon small">
                      </a>
                      <div class="megalinksub-2 nobottom">
                        <a ui-sref="dashboard.settings.main.account"
                          class="dropdown-link-2 megalink nobottomtext w-dropdown-link" tabindex="0"
                          style="outline: none;">
                          Settings
                        </a>
                      </div>
                    </div>
                    <div class="megadropdown-row small">
                      <a ui-sref="logout" class="w-inline-block"
                        tabindex="0" style="outline: none;">
                        <img
                          :src="LOB_ASSETS_URL+'/dashboard/navbar/sign-out.svg'"
                          alt="" class="megaicon small">
                      </a>
                      <div class="megalinksub-2 nobottom">
                        <a ui-sref="logout"
                          class="dropdown-link-2 megalink nobottomtext w-dropdown-link" tabindex="0"
                          style="outline: none;">
                          Sign Out
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="w-col w-col-1"></div>
                </div>
              </div>
            </nav>
          </div>
        </nav>
        <nav v-if="!showDashboardRedesign || !session.user.id" role="navigation" class="nav-menu-wrapper-4 w-nav-menu" :class="{ 'nav-menu-mobile-show': showMobileNav, 'nav-menu-mobile-hide': !showMobileNav }">
          <div class="nav-links-wrapper">
            <div class="nav-links nav-links-1">
              <div data-delay="0" data-hover="1" data-w-id="w-dropdown-toggle-0"
                class="nav-dropdown dropdownlinkmega w-dropdown" @mouseover="showProductsNav = true" @mouseleave="showProductsNav = false" @click="toggleMobileNavs('products')">
                <div class="nav-link-4 w-dropdown-toggle" id="w-dropdown-toggle-0" aria-controls="w-dropdown-list-0"
                  data-toggle="collapse" aria-haspopup="menu" aria-expanded="false" role="" tabindex="0"
                  style="outline: none;" :class="{'w--open': showProductsNav && (!showMobileNav || mobileNavs.products) }">
                  <div class="row-2 no-wrap">
                    <div class="text-block-68">Products</div><img
                      :src="LOB_ASSETS_URL+'/dashboard/navbar/caret-down.svg'"
                      width="24" alt="" class="dropdown-icon">
                  </div>
                </div>
                <nav class="dropdown-list-5 w-dropdown-list" id="w-dropdown-list-0" style="width: 430px;"
                  aria-labelledby="w-dropdown-toggle-0" :class="{ 'w--open': (!showMobileNav && showProductsNav) || (showMobileNav && mobileNavs.products) }">
                  <div class="dropdown-menu dropdownmega snug2">
                    <div class="text-small-4 meganavtitle sentencecase no-border-top">APIs</div>
                    <div class="megadropdown-row">
                      <a :href="LOB_URL+'/print-mail'" class="w-inline-block" tabindex="0"
                        style="outline: none;">
                        <img
                          :src="LOB_ASSETS_URL+'/dashboard/navbar/print-mail.svg'"
                          alt="" class="megaicon">
                      </a>
                      <div class="megalinksub-2">
                        <a :href="LOB_URL+'/print-mail'"
                          class="dropdown-link-2 megalink w-dropdown-link" tabindex="0" style="outline: none;">Print
                          &amp; Mail</a>
                        <div class="text-small-4 muted-80 hidden-on-mobile">Program and control direct mail just like
                          email</div>
                      </div>
                    </div>
                    <div class="megadropdown-row">
                      <a :href="LOB_URL+'/address-verification'" class="w-inline-block" tabindex="0"
                        style="outline: none;">
                        <img
                          :src="LOB_ASSETS_URL+'/dashboard/navbar/address-verification.svg'"
                          alt="" class="megaicon">
                      </a>
                      <div class="megalinksub-2"><a :href="LOB_URL+'/address-verification'"
                          class="dropdown-link-2 megalink w-dropdown-link" tabindex="0" style="outline: none;">
                          Address Verification</a>
                        <div class="text-small-4 muted-80 hidden-on-mobile">Validate, clean, and standardize address
                          data</div>
                      </div>
                    </div>
                    <div class="text-small-4 meganavtitle sentencecase">Partners</div>
                    <div class="megadropdown-row">
                      <a :href="LOB_URL+'/partner-program'" class="w-inline-block" tabindex="0"
                        style="outline: none;">
                        <img
                          :src="LOB_ASSETS_URL+'/dashboard/navbar/build.svg'"
                          alt="" class="megaicon">
                      </a>
                      <div class="megalinksub-2">
                        <a :href="LOB_URL+'/partner-program'"
                          class="dropdown-link-2 megalink w-dropdown-link" tabindex="0" style="outline: none;">
                          Build on Lob
                        </a>
                        <div class="text-small-4 muted-80 hidden-on-mobile">
                          Add personalized offline communications to <br>your app
                        </div>
                      </div>
                    </div>
                  </div>
                </nav>
              </div>
              <div data-delay="0" data-hover="1" data-w-id="w-dropdown-toggle-1"
                class="nav-dropdown dropdownlinkmega w-dropdown" @mouseenter="showSolutionsNav = true" @mouseleave="showSolutionsNav = false" @click="toggleMobileNavs('solutions')">
                <div class="nav-link-4 w-dropdown-toggle" id="w-dropdown-toggle-1" aria-controls="w-dropdown-list-1"
                  aria-haspopup="menu" aria-expanded="false" role="" tabindex="0" style="outline: none;" :class="{ 'w--open' : (!showMobileNav && showSolutionsNav) || (showMobileNav && mobileNavs.solutions) }">
                  <div class="row-2 no-wrap">
                    <div>Solutions</div>
                    <img
                      :src="LOB_ASSETS_URL+'/dashboard/navbar/caret-down.svg'"
                      width="24" alt="" class="dropdown-icon">
                  </div>
                </div>
                <nav class="dropdown-list-5 w-dropdown-list" style="height: 0px;" id="w-dropdown-list-1"
                  aria-labelledby="w-dropdown-toggle-1" :class="{ 'w--open' : (!showMobileNav && showSolutionsNav) || (showMobileNav && mobileNavs.solutions) }">
                  <div class="dropdown-menu dropdownmega">
                    <div class="w-row">
                      <div class="w-col w-col-6 w-col-stack">
                        <div class="text-small-4 meganavtitle sentencecase no-border-top">Industry</div>
                        <div class="megadropdown-row small">
                          <a :href="LOB_URL+'/financial-services'" class="w-inline-block" tabindex="0"
                            style="outline: none;">
                            <img
                              :src="LOB_ASSETS_URL+'/dashboard/navbar/finance.svg'"
                              alt="" class="megaicon small">
                          </a>
                          <div class="megalinksub-2 nobottom">
                            <a :href="LOB_URL+'/financial-services'" class="dropdown-link-2 megalink nobottomtext w-dropdown-link"
                              tabindex="0" style="outline: none;">
                              Financial Services
                            </a>
                          </div>
                        </div>
                        <div class="megadropdown-row small">
                          <a :href="LOB_URL+'/insurance'" class="w-inline-block" tabindex="0"
                            style="outline: none;">
                            <img
                              :src="LOB_ASSETS_URL+'/dashboard/navbar/insurance.svg'"
                              alt="" class="megaicon small">
                          </a>
                          <div class="megalinksub-2 nobottom">
                            <a :href="LOB_URL+'/insurance'"
                              class="dropdown-link-2 megalink nobottomtext w-dropdown-link" tabindex="0"
                              style="outline: none;">Insurance</a>
                          </div>
                        </div>
                        <div class="megadropdown-row small">
                          <a :href="LOB_URL+'/healthcare'" class="w-inline-block" tabindex="0"
                            style="outline: none;">
                            <img
                              :src="LOB_ASSETS_URL+'/dashboard/navbar/healthcare.svg'"
                              alt="" class="megaicon small">
                          </a>
                          <div class="megalinksub-2 nobottom">
                            <a :href="LOB_URL+'/healthcare'"
                              class="dropdown-link-2 megalink nobottomtext w-dropdown-link" tabindex="0"
                              style="outline: none;">Healthcare</a>
                          </div>
                        </div>
                        <div class="megadropdown-row small">
                          <a :href="LOB_URL+'/retail'" class="w-inline-block" tabindex="0"
                            style="outline: none;">
                            <img
                              :src="LOB_ASSETS_URL+'/dashboard/navbar/retail.svg'"
                              alt="" class="megaicon small">
                          </a>
                          <div class="megalinksub-2 nobottom">
                            <a :href="LOB_URL+'/retail'"
                              class="dropdown-link-2 megalink nobottomtext w-dropdown-link" tabindex="0"
                              style="outline: none;">
                              Retail &amp; eCommerce
                            </a>
                          </div>
                        </div>
                      </div>
                      <div class="w-col w-col-6 w-col-stack">
                        <div class="text-small-4 meganavtitle sentencecase">Role</div>
                        <div class="megadropdown-row small">
                          <a :href="LOB_URL+'/product-managers'" class="w-inline-block" tabindex="0"
                            style="outline: none;">
                            <img
                              :src="LOB_ASSETS_URL+'/dashboard/navbar/product-manager.svg'"
                              alt="" class="megaicon small">
                          </a>
                          <div class="megalinksub-2 nobottom">
                            <a :href="LOB_URL+'/product-managers'"
                              class="dropdown-link-2 megalink nobottomtext w-dropdown-link" tabindex="0"
                              style="outline: none;">
                              Product Managers
                            </a>
                          </div>
                        </div>
                        <div class="megadropdown-row small">
                          <a :href="LOB_URL+'/developers'" class="w-inline-block" tabindex="0"
                            style="outline: none;">
                            <img
                              :src="LOB_ASSETS_URL+'/dashboard/navbar/developer.svg'"
                              alt="" class="megaicon small">
                          </a>
                          <div class="megalinksub-2 nobottom">
                            <a :href="LOB_URL+'/developers'"
                              class="dropdown-link-2 megalink nobottomtext w-dropdown-link" tabindex="0"
                              style="outline: none;">Developers</a>
                          </div>
                        </div>
                        <div class="megadropdown-row small">
                          <a :href="LOB_URL+'/marketers'" class="w-inline-block" tabindex="0"
                            style="outline: none;">
                            <img
                              :src="LOB_ASSETS_URL+'/dashboard/navbar/marketer.svg'"
                              alt="" class="megaicon small">
                          </a>
                          <div class="megalinksub-2 nobottom">
                            <a :href="LOB_URL+'/marketers'"
                              class="dropdown-link-2 megalink nobottomtext w-dropdown-link" tabindex="0"
                              style="outline: none;">Marketers</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </nav>
              </div>
              <div data-delay="0" data-hover="1" data-w-id="w-dropdown-toggle-2"
                class="nav-dropdown dropdownlinkmega w-dropdown" @mouseenter="showPricingNav = true" @mouseleave="showPricingNav = false" @click="toggleMobileNavs('pricing')">
                <div class="nav-link-4 w-dropdown-toggle" id="w-dropdown-toggle-2" aria-controls="w-dropdown-list-2"
                  aria-haspopup="menu" aria-expanded="false" role="" tabindex="0" style="outline: none;" :class="{ 'w--open' : (!showMobileNav && showPricingNav) || (showMobileNav && mobileNavs.pricing) }">
                  <div class="row-2 no-wrap">
                    <div>Pricing</div>
                    <img
                      :src="LOB_ASSETS_URL+'/dashboard/navbar/caret-down.svg'"
                      width="24" alt="" class="dropdown-icon">
                  </div>
                </div>
                <nav class="dropdown-list-5 w-dropdown-list" style="height: 0px;" id="w-dropdown-list-2"
                  aria-labelledby="w-dropdown-toggle-2" :class="{ 'w--open' : (!showMobileNav && showPricingNav) || (showMobileNav && mobileNavs.pricing) }">
                  <div class="dropdown-menu dropdownmega snug">
                    <div class="w-row">
                      <div class="w-col w-col-11">
                        <div class="text-small-4 meganavtitle sentencecase no-border-top">Pricing</div>
                        <div class="megadropdown-row small">
                          <a :href="LOB_URL+'/pricing/print-mail'" class="w-inline-block" tabindex="0"
                            style="outline: none;">
                            <img
                              :src="LOB_ASSETS_URL+'/dashboard/navbar/print-mail.svg'"
                              alt="" class="megaicon small">
                          </a>
                          <div class="megalinksub-2 nobottom">
                            <a :href="LOB_URL+'/pricing/print-mail'"
                              class="dropdown-link-2 megalink nobottomtext w-dropdown-link" tabindex="0"
                              style="outline: none;">
                              Print &amp; Mail
                            </a>
                          </div>
                        </div>
                        <div class="megadropdown-row small">
                          <a :href="LOB_URL+'/pricing/address-verification'" class="w-inline-block"
                            tabindex="0" style="outline: none;">
                            <img
                              :src="LOB_ASSETS_URL+'/dashboard/navbar/address-verification.svg'"
                              alt="" class="megaicon small">
                          </a>
                          <div class="megalinksub-2 nobottom">
                            <a :href="LOB_URL+'/pricing/address-verification'"
                              class="dropdown-link-2 megalink nobottomtext w-dropdown-link" tabindex="0"
                              style="outline: none;">
                              Address Verification
                            </a>
                          </div>
                        </div>
                        <div class="megadropdown-row small">
                          <a :href="LOB_URL+'/pricing/premium-support'" class="w-inline-block"
                            tabindex="0" style="outline: none;">
                            <img
                              :src="LOB_ASSETS_URL+'/dashboard/navbar/premium-support.svg'"
                              alt="" class="megaicon small">
                          </a>
                          <div class="megalinksub-2 nobottom">
                            <a :href="LOB_URL+'/pricing/premium-support'"
                              class="dropdown-link-2 megalink nobottomtext w-dropdown-link" tabindex="0"
                              style="outline: none;">
                              Premium Support
                            </a>
                          </div>
                        </div>
                      </div>
                      <div class="w-col w-col-1"></div>
                    </div>
                  </div>
                </nav>
              </div>
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
                        <div class="megadropdown-row small">
                          <a href="https://docs.lob.com" class="w-inline-block" target="_blank"
                            tabindex="0" style="outline: none;">
                            <img
                              src="/assets/icons/icon-lookup.svg"
                              alt="Icon lookup" class="megaicon small">
                          </a>
                          <div class="megalinksub-2 nobottom">
                            <a href="https://docs.lob.com"
                              target="_blank"
                              class="dropdown-link-2 megalink nobottomtext w-dropdown-link" tabindex="0"
                              style="outline: none;">
                              API Reference
                            </a>
                          </div>
                        </div>
                        <div class="megadropdown-row small">
                          <a href="https://status.lob.com" class="w-inline-block" target="_blank"
                            tabindex="0" style="outline: none;">
                            <img
                              src="/assets/icons/icon-status.svg"
                              alt="" class="megaicon small">
                          </a>
                          <div class="megalinksub-2 nobottom">
                            <a href="https://status.lob.com"
                              target="_blank"
                              class="dropdown-link-2 megalink nobottomtext w-dropdown-link" tabindex="0"
                              style="outline: none;">
                              API Status
                            </a>
                          </div>
                        </div>
                        <div class="megadropdown-row small">
                          <a :href="LOB_URL+'/guides'" class="w-inline-block" tabindex="0" target="_blank"
                            style="outline: none;">
                            <img
                              :src="LOB_ASSETS_URL+'/dashboard/navbar/guides.svg'"
                              alt="" class="megaicon small">
                          </a>
                          <div class="megalinksub-2 nobottom">
                            <a :href="LOB_URL+'/guides'"
                              target="_blank"
                              class="dropdown-link-2 megalink nobottomtext w-dropdown-link" tabindex="0"
                              style="outline: none;">
                              Guides
                            </a>
                          </div>
                        </div>
                        <div class="megadropdown-row small">
                          <a :href="LOB_URL+'/template-gallery'" class="w-inline-block" tabindex="0" target="_blank"
                            style="outline: none;">
                            <img
                              :src="LOB_ASSETS_URL+'/dashboard/navbar/template-gallery.svg'"
                              alt="" class="megaicon small">
                          </a>
                          <div class="megalinksub-2 nobottom">
                            <a :href="LOB_URL+'/template-gallery'"
                              target="_blank"
                              class="dropdown-link-2 megalink nobottomtext w-dropdown-link" tabindex="0"
                              style="outline: none;">Template Gallery</a>
                          </div>
                        </div>
                        <div class="megadropdown-row small">
                          <a href="https://support.lob.com/hc/en-us" class="w-inline-block" tabindex="0" target="_blank"
                            style="outline: none;">
                            <img
                              :src="LOB_ASSETS_URL+'/dashboard/navbar/help.svg'"
                              alt="" class="megaicon small">
                          </a>
                          <div class="megalinksub-2 nobottom">
                            <a href="https://support.lob.com/hc/en-us"
                              target="_blank"
                              class="dropdown-link-2 megalink nobottomtext w-dropdown-link" tabindex="0"
                              style="outline: none;">
                              Help Center
                            </a>
                          </div>
                        </div>
                      </div>
                      <div class="w-col w-col-6 w-col-stack">
                        <div class="text-small-4 meganavtitle sentencecase">Content &amp; Events</div>
                        <div class="megadropdown-row small">
                          <a :href="LOB_URL+'/library'" class="w-inline-block" tabindex="0"
                            style="outline: none;">
                            <img
                              :src="LOB_ASSETS_URL+'/dashboard/navbar/library.svg'"
                              alt="" class="megaicon small">
                          </a>
                          <div class="megalinksub-2 nobottom">
                            <a :href="LOB_URL+'/library'"
                              class="dropdown-link-2 megalink nobottomtext w-dropdown-link" tabindex="0"
                              style="outline: none;">
                              Library
                            </a>
                          </div>
                        </div>
                        <div class="megadropdown-row small">
                          <a :href="LOB_URL+'/events'" class="w-inline-block" tabindex="0"
                            style="outline: none;">
                            <img
                              :src="LOB_ASSETS_URL+'/dashboard/navbar/events.svg'"
                              alt="" class="megaicon small">
                          </a>
                          <div class="megalinksub-2 nobottom">
                            <a :href="LOB_URL+'/events'"
                              class="dropdown-link-2 megalink nobottomtext w-dropdown-link" tabindex="0"
                              style="outline: none;">Events</a>
                          </div>
                        </div>
                        <div class="megadropdown-row small">
                          <a :href="LOB_URL+'/blog'" class="w-inline-block" tabindex="0"
                            style="outline: none;">
                            <img
                              :src="LOB_ASSETS_URL+'/dashboard/navbar/blog.svg'"
                              alt="" class="megaicon small">
                          </a>
                          <div class="megalinksub-2 nobottom">
                            <a :href="LOB_URL+'/blog'"
                              class="dropdown-link-2 megalink nobottomtext w-dropdown-link" tabindex="0"
                              style="outline: none;">Blog</a>
                          </div>
                        </div>
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
                <nav class="dropdown-list-5 w-dropdown-list" style="height: 0px;" id="w-dropdown-list-3"
                  aria-labelledby="w-dropdown-toggle-3" :class="{ 'w--open' : (!showMobileNav && showCompanyNav) || (showMobileNav && mobileNavs.company) }">
                  <div class="dropdown-menu dropdownmega">
                    <div class="w-row">
                      <div class="w-col w-col-6 w-col-stack">
                        <div class="text-small-4 meganavtitle sentencecase no-border-top">About</div>
                        <div class="megadropdown-row small">
                          <a :href="LOB_URL+'/about'" aria-current="page"
                            class="w-inline-block w--current" tabindex="0" style="outline: none;">
                            <img
                              :src="LOB_ASSETS_URL+'/dashboard/navbar/about.svg'"
                              alt="" class="megaicon small">
                          </a>
                          <div class="megalinksub-2 nobottom">
                            <a :href="LOB_URL+'/about'" aria-current="page"
                              class="dropdown-link-2 megalink nobottomtext w-dropdown-link w--current" tabindex="0"
                              style="outline: none;">
                              About Lob
                            </a>
                          </div>
                        </div>
                        <div class="megadropdown-row small">
                          <a :href="LOB_URL+'/careers'" class="w-inline-block" tabindex="0"
                            style="outline: none;">
                            <img
                              :src="LOB_ASSETS_URL+'/dashboard/navbar/careers.svg'"
                              alt="" class="megaicon small">
                          </a>
                          <div class="megalinksub-2 nobottom">
                            <a :href="LOB_URL+'/careers'"
                              class="dropdown-link-2 megalink nobottomtext w-dropdown-link" tabindex="0"
                              style="outline: none;">
                              Careers
                            </a>
                          </div>
                        </div>
                        <div class="megadropdown-row small">
                          <a href="https://www.lob.org/" class="w-inline-block" tabindex="0"
                            style="outline: none;">
                            <img
                              :src="LOB_ASSETS_URL+'/dashboard/navbar/icon_heart.svg'"
                              alt="" class="megaicon small">
                          </a>
                          <div class="megalinksub-2 nobottom">
                            <a href="https://www.lob.org/"
                              class="dropdown-link-2 megalink nobottomtext w-dropdown-link" tabindex="0"
                              style="outline: none;">
                              Lob.org
                            </a>
                          </div>
                        </div>
                      </div>
                      <div class="w-col w-col-6 w-col-stack">
                        <div class="text-small-4 meganavtitle sentencecase">Partners</div>
                        <div class="megadropdown-row small">
                          <a :href="LOB_URL+'/partners'" class="w-inline-block" tabindex="0"
                            style="outline: none;">
                            <img
                              src="/assets/icons/icon-partnership.svg"
                              alt="" class="megaicon small">
                          </a>
                          <div class="megalinksub-2 nobottom">
                            <a :href="LOB_URL+'/partners'" target="_blank"
                              class="dropdown-link-2 megalink nobottomtext w-dropdown-link" tabindex="0"
                              style="outline: none;">
                              Partnerships
                            </a>
                          </div>
                        </div>
                        <div class="megadropdown-row small">
                          <a :href="LOB_URL+'/print-partner'" class="w-inline-block" tabindex="0"
                            style="outline: none;">
                            <img
                              src="/assets/icons/icon-printer.svg"
                              alt="" class="megaicon small">
                          </a>
                          <div class="megalinksub-2 nobottom">
                            <a :href="LOB_URL+'/print-partner'" target="_blank"
                              class="dropdown-link-2 megalink nobottomtext w-dropdown-link" tabindex="0"
                              style="outline: none;">
                              Print Network
                            </a>
                          </div>
                        </div>
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
                    <div class="megadropdown-row small">
                      <a ui-sref="dashboard.settings.main.account" class="w-inline-block" tabindex="0"
                        style="outline: none;">
                        <img
                          :src="LOB_ASSETS_URL+'/dashboard/navbar/settings.svg'"
                          alt="" class="megaicon small">
                      </a>
                      <div class="megalinksub-2 nobottom">
                        <a ui-sref="dashboard.settings.main.account"
                          class="dropdown-link-2 megalink nobottomtext w-dropdown-link" tabindex="0"
                          style="outline: none;">
                          Settings
                        </a>
                      </div>
                    </div>
                    <div class="megadropdown-row small">
                      <a ui-sref="logout" class="w-inline-block"
                        tabindex="0" style="outline: none;">
                        <img
                          :src="LOB_ASSETS_URL+'/dashboard/navbar/sign-out.svg'"
                          alt="" class="megaicon small">
                      </a>
                      <div class="megalinksub-2 nobottom">
                        <a ui-sref="logout"
                          class="dropdown-link-2 megalink nobottomtext w-dropdown-link" tabindex="0"
                          style="outline: none;">
                          Sign Out
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="w-col w-col-1"></div>
                </div>
              </div>
            </nav>
          </div>
          <div @click="hideMobileNav()" class="nav-functions-2 signup">
            <a v-if="!session.user.id" ui-sref="register" class="button-4 rebrand-btn-blue w-button">Sign up</a>
            <a v-else ui-sref="dashboard.settings.main.account" class="button-4 rebrand-btn-blue w-button">Settings</a>
          </div>
          <div  @click="hideMobileNav()" class="nav-functions-2 login">
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
              alt="" class="menu-icon" @click="showMobileNav = true" ng-hide="showMobileNav">
            <img :src="LOB_ASSETS_URL+'/dashboard/navbar/x.svg'"
              alt="" class="menu-cross-icon" @click="showMobileNav = false" ng-show="showMobileNav">
          </div>
        </div>
        <div class="w-nav-overlay" data-wf-ignore="" :class="{ 'nav-menu-mobile-show': showMobileNav, 'nav-menu-mobile-hide': !showMobileNav }"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopNavbar',
  data() {
    return {
      LOB_URL: 'https://lob.com',
      LOB_ASSETS_URL: 'https://s3-us-west-2.amazonaws.com/public.lob.com',
      showMobileNav: false,
      showYourResourcesNav: false,
      showYourDashboardNav: false,
      showPricingNav: false,
      showDashboardRedesign: false,
      showProductsNav: false,
      showSolutionsNav: false,
      showPricingNav: false,
      showDocsNav: false,
      showCompanyNav: false,
      session: {
        user: {
          id: 2,
          first_name: 'Test',
          last_name: 'User'
        }
      },
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
