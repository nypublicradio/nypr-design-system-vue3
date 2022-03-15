<template>
  <div :class="containerClass">
    <div class="col-12 p-fluid">
      <div class="card">
        <h5>Typography</h5>
        <h1>h1: We're Pretty Sure Your Dog Can't Get Coronavirus</h1>
        <h2>h2: We're Pretty Sure Your Dog Can't Get Coronavirus</h2>
        <h3>h3: We're Pretty Sure Your Dog Can't Get Coronavirus</h3>
        <h4>h4: We're Pretty Sure Your Dog Can't Get Coronavirus</h4>
        <h5>h5: We're Pretty Sure Your Dog Can't Get Coronavirus</h5>
        <h6>h6: We're Pretty Sure Your Dog Can't Get Coronavirus</h6>
        <ul>
          <li>One</li>
          <li>Two</li>
          <li>Three</li>
        </ul>
        <ol>
          <li>One</li>
          <li>Two</li>
          <li>Three</li>
        </ol>
        <p>
          p: Blep boofers ur givin me a spook heckin ruff, you are doin me a
          concern pupperino. Wrinkler very good spot doge, yapper. Pupperino
          boof he made many woofs long doggo dat tungg tho adorable doggo, long
          woofer shoober
          <b>spats</b> super chub.
        </p>
        <p class="footer">
          footer: Blep boofers ur givin me a spook heckin ruff, you are doin me
          a concern pupperino. Wrinkler very good spot doge, yapper. Pupperino
          boof he made many woofs long doggo dat tungg tho adorable doggo, long
          woofer shoober smol borking doggo with a long snoot for pats
          puggorino, waggy wags dat tungg tho maximum borkdrive pupperino. Fat
          boi long water shoob blop much ruin diet, length boy. Super chub smol
          borking doggo with a long snoot for pats super chub.
        </p>
      </div>
    </div>

    <div class="col-12 p-fluid">
      <div class="card">
        <h5>Colors</h5>
        <div class="grid">
          <div class="col-4 swatch primary">Primary Color</div>
          <div class="col-4 swatch primary">Primary Color</div>
          <div class="col-4 swatch primary">Primary Color</div>
          <div class="col swatch primary">Primary Color</div>
          <div class="col swatch primary">Primary Color</div>
          <div class="col swatch primary">Primary Color</div>
          <div class="col swatch primary">Primary Color</div>
          <div class="col swatch primary">Primary Color</div>
          <div class="col swatch primary">Primary Color</div>
          <div class="col swatch primary">Primary Color</div>
        </div>
      </div>
    </div>

    <div class="col-12 md:col-6 p-fluid">
      <div class="card">
        <h5>InputText</h5>
        <div class="grid p-formgrid">
          <div class="col-4">
            <InputText type="text" placeholder="Default"></InputText>
          </div>
          <div class="col-4">
            <InputText
              type="text"
              placeholder="Disabled"
              :disabled="true"
            ></InputText>
          </div>
          <div class="col-4">
            <InputText type="text" placeholder="Invalid" class="p-invalid" />
          </div>
        </div>

        <h5>Icons</h5>
        <div class="grid p-formgrid">
          <div class="col-4">
            <span class="p-input-icon-left">
              <i class="pi pi-user" />
              <InputText type="text" placeholder="Username" />
            </span>
          </div>
          <div class="col-4">
            <span class="p-input-icon-right">
              <InputText type="text" placeholder="Search" />
              <i class="pi pi-search" />
            </span>
          </div>
          <div class="col-4">
            <span class="p-input-icon-left p-input-icon-right">
              <i class="pi pi-user" />
              <InputText type="text" placeholder="Search" />
              <i class="pi pi-search" />
            </span>
          </div>
        </div>

        <h5>Float Label</h5>
        <span class="p-float-label">
          <InputText id="username" v-model="floatValue" type="text" />
          <label for="username">Username</label>
        </span>

        <h5>Textarea</h5>
        <Textarea
          placeholder="Your Message"
          :auto-resize="true"
          rows="3"
          cols="30"
        />

        <h5>AutoComplete</h5>
        <AutoComplete
          id="dd"
          v-model="selectedAutoValue"
          placeholder="Search"
          :dropdown="true"
          :multiple="true"
          :suggestions="autoFilteredValue"
          field="name"
          @complete="searchCountry($event)"
        />

        <h5>Calendar</h5>
        <Calendar
          v-model="calendarValue"
          :show-icon="true"
          :show-button-bar="true"
        ></Calendar>

        <h5>Spinner</h5>
        <InputNumber
          v-model="inputNumberValue"
          show-buttons
          mode="decimal"
        ></InputNumber>

        <h5>Chips</h5>
        <Chips v-model="chipsValue" />
      </div>

      <div class="card">
        <h5>Slider</h5>
        <InputText v-model.number="sliderValue" />
        <Slider v-model="sliderValue" />

        <h5>Rating</h5>
        <Rating v-model="ratingValue" />

        <h5>Input Switch</h5>
        <InputSwitch v-model="switchValue" />
      </div>
    </div>

    <div class="col-12 md:col-6">
      <div class="card">
        <h5>RadioButton</h5>
        <div class="grid">
          <div class="col-4 md:p-1">
            <div class="field-radiobutton">
              <RadioButton
                id="option1"
                v-model="radioValue"
                name="option"
                value="Option 1"
              />
              <label for="option1">Option 1</label>
            </div>
          </div>
          <div class="col-4 md:p-1">
            <div class="field-radiobutton">
              <RadioButton
                id="option2"
                v-model="radioValue"
                name="option"
                value="Option 2"
              />
              <label for="option2">Option 2</label>
            </div>
          </div>
          <div class="col-4 md:p-1">
            <div class="field-radiobutton">
              <RadioButton
                id="option3"
                v-model="radioValue"
                name="option"
                value="Option 3"
              />
              <label for="option3">Option 3</label>
            </div>
          </div>
        </div>

        <h5>Checkbox</h5>
        <div class="grid">
          <div class="col-4 md:p-1">
            <div class="field-checkbox">
              <Checkbox
                id="checkOption1"
                v-model="checkboxValue"
                name="option"
                value="Option 1"
              />
              <label for="checkOption1">Option 1</label>
            </div>
          </div>
          <div class="col-4 md:p-1">
            <div class="field-checkbox">
              <Checkbox
                id="checkOption2"
                v-model="checkboxValue"
                name="option"
                value="Option 2"
              />
              <label for="checkOption2">Option 2</label>
            </div>
          </div>
          <div class="col-4 md:p-1">
            <div class="field-checkbox">
              <Checkbox
                id="checkOption3"
                v-model="checkboxValue"
                name="option"
                value="Option 3"
              />
              <label for="checkOption3">Option 3</label>
            </div>
          </div>
        </div>
      </div>

      <div class="card p-fluid">
        <h5>Listbox</h5>
        <Listbox
          v-model="listboxValue"
          :options="listboxValues"
          option-label="name"
          :filter="true"
        />

        <h5>Dropdown</h5>
        <Dropdown
          v-model="dropdownValue"
          :options="dropdownValues"
          option-label="name"
          placeholder="Select"
        />

        <h5>MultiSelect</h5>
        <MultiSelect
          v-model="multiselectValue"
          :options="multiselectValues"
          option-label="name"
          placeholder="Select Countries"
          :filter="true"
        ></MultiSelect>
      </div>

      <div class="card p-fluid">
        <h5>ToggleButton</h5>
        <ToggleButton v-model="toggleValue" on-label="Yes" off-label="No" />

        <h5>SelectButton</h5>
        <SelectButton
          v-model="selectButtonValue1"
          :options="selectButtonValues1"
          option-label="name"
        />

        <h5>SelectButton - Multiple</h5>
        <SelectButton
          v-model="selectButtonValue2"
          :options="selectButtonValues2"
          option-label="name"
          :multiple="true"
        />
      </div>
    </div>

    <div class="col-12">
      <div class="card">
        <h5>Buttons</h5>
        <Button label="Submit" class="mr-2 mb:p-2" />
        <Button icon="pi pi-check" class="mr-2 mb:p-2" />
        <Button label="Submit" icon="pi pi-check" class="mr-2 mb:p-2" />
        <Button
          label="Submit"
          icon="pi pi-check"
          icon-pos="right"
          class="mr-2 mb:p-2"
        />
        <Button label="Disabled" disabled="disabled" class="mr-2 mb:p-2" />

        <h5>Severities</h5>
        <Button label="Primary" class="mr-2 mb:p-2" />
        <Button label="Secondary" class="p-button-secondary mr-2 mb:p-2" />
        <Button label="Success" class="p-button-success mr-2 mb:p-2" />
        <Button label="Info" class="p-button-info mr-2 mb:p-2" />
        <Button label="Warning" class="p-button-warning mr-2 mb:p-2" />
        <Button label="Help" class="p-button-help mr-2 mb:p-2" />
        <Button label="Danger" class="p-button-danger mr-2 mb:p-2" />

        <h5>Raised Buttons</h5>
        <Button label="Primary" class="p-button-raised mr-2 mb:p-2" />
        <Button
          label="Secondary"
          class="p-button-raised p-button-secondary mr-2 mb:p-2"
        />
        <Button
          label="Success"
          class="p-button-raised p-button-success mr-2 mb:p-2"
        />
        <Button
          label="Info"
          class="p-button-raised p-button-info mr-2 mb:p-2"
        />
        <Button
          label="Warning"
          class="p-button-raised p-button-warning mr-2 mb:p-2"
        />
        <Button
          label="Help"
          class="p-button-raised p-button-help mr-2 mb:p-2"
        />
        <Button label="Danger" class="p-button-raised p-button-danger mb:p-2" />

        <h5>Rounded Buttons</h5>
        <Button label="Primary" class="p-button-rounded mr-2 mb:p-2" />
        <Button
          label="Secondary"
          class="p-button-rounded p-button-secondary mr-2 mb:p-2"
        />
        <Button
          label="Success"
          class="p-button-rounded p-button-success mr-2 mb:p-2"
        />
        <Button
          label="Info"
          class="p-button-rounded p-button-info mr-2 mb:p-2"
        />
        <Button
          label="Warning"
          class="p-button-rounded p-button-warning mr-2 mb:p-2"
        />
        <Button
          label="Help"
          class="p-button-rounded p-button-help mr-2 mb:p-2"
        />
        <Button
          label="Danger"
          class="p-button-rounded p-button-danger mb:p-2"
        />

        <h5>Text Buttons</h5>
        <Button label="Primary" class="p-button-text mr-2 mb:p-2" />
        <Button
          label="Secondary"
          class="p-button-secondary p-button-text mr-2 mb:p-2"
        />
        <Button
          label="Success"
          class="p-button-success p-button-text mr-2 mb:p-2"
        />
        <Button label="Info" class="p-button-info p-button-text mr-2 mb:p-2" />
        <Button
          label="Warning"
          class="p-button-warning p-button-text mr-2 mb:p-2"
        />
        <Button label="Help" class="p-button-help p-button-text mr-2 mb:p-2" />
        <Button
          label="Danger"
          class="p-button-danger p-button-text mr-2 mb:p-2"
        />
        <Button label="Plain" class="p-button-text p-button-plain mb:p-2" />

        <h5>Raised Text Buttons</h5>
        <Button
          label="Primary"
          class="p-button-raised p-button-text mr-2 mb:p-2"
        />
        <Button
          label="Secondary"
          class="p-button-raised p-button-secondary p-button-text mr-2 mb:p-2"
        />
        <Button
          label="Success"
          class="p-button-raised p-button-success p-button-text mr-2 mb:p-2"
        />
        <Button
          label="Info"
          class="p-button-raised p-button-info p-button-text mr-2 mb:p-2"
        />
        <Button
          label="Warning"
          class="p-button-raised p-button-warning p-button-text mr-2 mb:p-2"
        />
        <Button
          label="Help"
          class="p-button-raised p-button-help p-button-text mr-2 mb:p-2"
        />
        <Button
          label="Danger"
          class="p-button-raised p-button-danger p-button-text mr-2 mb:p-2"
        />
        <Button
          label="Plain"
          class="p-button-raised p-button-plain p-button-text mb:p-2"
        />

        <h5>Outlined Buttons</h5>
        <Button label="Primary" class="p-button-outlined mr-2 mb:p-2" />
        <Button
          label="Secondary"
          class="p-button-outlined p-button-secondary mr-2 mb:p-2"
        />
        <Button
          label="Success"
          class="p-button-outlined p-button-success mr-2 mb:p-2"
        />
        <Button
          label="Info"
          class="p-button-outlined p-button-info mr-2 mb:p-2"
        />
        <Button
          label="Warning"
          class="p-button-outlined p-button-warning mr-2 mb:p-2"
        />
        <Button
          label="Help"
          class="p-button-outlined p-button-help mr-2 mb:p-2"
        />
        <Button
          label="Danger"
          class="p-button-outlined p-button-danger mr-2 mb:p-2"
        />
        <Button label="Plain" class="p-button-outlined p-button-plain mb:p-2" />

        <h5>Rounded Icon Buttons</h5>
        <Button icon="pi pi-check" class="p-button-rounded mr-2 mb:p-2" />
        <Button
          icon="pi pi-bookmark"
          class="p-button-rounded p-button-secondary mr-2 mb:p-2"
        />
        <Button
          icon="pi pi-search"
          class="p-button-rounded p-button-success mr-2 mb:p-2"
        />
        <Button
          icon="pi pi-user"
          class="p-button-rounded p-button-info mr-2 mb:p-2"
        />
        <Button
          icon="pi pi-bell"
          class="p-button-rounded p-button-warning mr-2 mb:p-2"
        />
        <Button
          icon="pi pi-heart"
          class="p-button-rounded p-button-help mr-2 mb:p-2"
        />
        <Button
          icon="pi pi-times"
          class="p-button-rounded p-button-danger mb:p-2"
        />

        <h5>Rounded Text Icon Buttons</h5>
        <Button
          icon="pi pi-check"
          class="p-button-rounded p-button-text mr-2 mb:p-2"
        />
        <Button
          icon="pi pi-bookmark"
          class="p-button-rounded p-button-secondary p-button-text mr-2 mb:p-2"
        />
        <Button
          icon="pi pi-search"
          class="p-button-rounded p-button-success p-button-text mr-2 mb:p-2"
        />
        <Button
          icon="pi pi-user"
          class="p-button-rounded p-button-info p-button-text mr-2 mb:p-2"
        />
        <Button
          icon="pi pi-bell"
          class="p-button-rounded p-button-warning p-button-text mr-2 mb:p-2"
        />
        <Button
          icon="pi pi-heart"
          class="p-button-rounded p-button-help p-button-text mr-2 mb:p-2"
        />
        <Button
          icon="pi pi-times"
          class="p-button-rounded p-button-danger p-button-text mr-2 mb:p-2"
        />

        <h5>Rounded and Outlined Icon Buttons</h5>
        <Button
          icon="pi pi-check"
          class="p-button-rounded p-button-outlined mr-2 mb:p-2"
        />
        <Button
          icon="pi pi-bookmark"
          class="p-button-rounded p-button-secondary p-button-outlined mr-2 mb:p-2"
        />
        <Button
          icon="pi pi-search"
          class="p-button-rounded p-button-success p-button-outlined mr-2 mb:p-2"
        />
        <Button
          icon="pi pi-user"
          class="p-button-rounded p-button-info p-button-outlined mr-2 mb:p-2"
        />
        <Button
          icon="pi pi-bell"
          class="p-button-rounded p-button-warning p-button-outlined mr-2 mb:p-2"
        />
        <Button
          icon="pi pi-heart"
          class="p-button-rounded p-button-help p-button-outlined mr-2 mb:p-2"
        />
        <Button
          icon="pi pi-times"
          class="p-button-rounded p-button-danger p-button-outlined mb:p-2"
        />

        <h5>Badges</h5>
        <Button type="button" label="Emails" badge="8" class="mr-2 mb:p-2" />
        <Button
          type="button"
          label="Messages"
          icon="pi pi-users"
          class="p-button-warning mb:p-2"
          badge="8"
          badge-class="p-badge-danger"
        />

        <h5>Button Set</h5>
        <span class="p-buttonset">
          <Button label="Save" icon="pi pi-check" />
          <Button label="Delete" icon="pi pi-trash" />
          <Button label="Cancel" icon="pi pi-times" />
        </span>
      </div>
    </div>

    <div class="col-12">
      <div class="card">
        <DataTable
          v-model:selection="selectedCustomers"
          v-model:filters="filters"
          :value="customers"
          :paginator="true"
          :rows="10"
          data-key="id"
          :row-hover="true"
          filter-display="menu"
          paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rows-per-page-options="[10, 25, 50]"
          current-page-report-template="Showing {first} to {last} of {totalRecords} entries"
          :global-filter-fields="[
            'name',
            'country.name',
            'representative.name',
            'status',
          ]"
          responsive-layout="scroll"
        >
          <template #header>
            <div class="p-d-flex p-jc-between p-ai-center">
              <h5 class="p-m-0">Customers</h5>
              <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText
                  v-model="filters['global'].value"
                  placeholder="Keyword Search"
                />
              </span>
            </div>
          </template>
          <template #empty>No customers found.</template>
          <Column selection-mode="multiple" style="min-width: 3rem"></Column>
          <Column field="name" header="Name" sortable style="min-width: 14rem">
            <template #body="{ data }">{{ data.name }}</template>
            <template #filter="{ filterModel }">
              <InputText
                v-model="filterModel.value"
                type="text"
                class="p-column-filter"
                placeholder="Search by name"
              />
            </template>
          </Column>
          <Column
            field="country.name"
            header="Country"
            sortable
            filter-match-mode="contains"
            style="min-width: 14rem"
          >
            <template #body="{ data }">
              <img
                src="../assets/images/flag_placeholder.png"
                :class="'flag flag-' + data.country.code"
                width="30"
              />
              <span class="image-text">{{ data.country.name }}</span>
            </template>
            <template #filter="{ filterModel }">
              <InputText
                v-model="filterModel.value"
                type="text"
                class="p-column-filter"
                placeholder="Search by country"
              />
            </template>
          </Column>
          <Column
            header="Agent"
            sortable
            filter-field="representative"
            sort-field="representative.name"
            :show-filter-match-modes="false"
            :filter-menu-style="{ width: '14rem' }"
            style="min-width: 14rem"
          >
            <template #body="{ data }">
              <img
                :alt="data.representative.name"
                :src="'demo/images/avatar/' + data.representative.image"
                width="32"
                style="vertical-align: middle"
              />
              <span class="image-text">{{ data.representative.name }}</span>
            </template>
            <template #filter="{ filterModel }">
              <div class="mb:p-3 p-text-bold">Agent Picker</div>
              <MultiSelect
                v-model="filterModel.value"
                :options="representatives"
                option-label="name"
                placeholder="Any"
                class="p-column-filter"
              >
                <template #option="slotProps">
                  <div class="p-multiselect-representative-option">
                    <img
                      :alt="slotProps.option.name"
                      :src="'demo/images/avatar/' + slotProps.option.image"
                      width="32"
                      style="vertical-align: middle"
                    />
                    <span class="image-text">{{ slotProps.option.name }}</span>
                  </div>
                </template>
              </MultiSelect>
            </template>
          </Column>
          <Column
            field="date"
            header="Date"
            sortable
            data-type="date"
            style="min-width: 8rem"
          >
            <template #body="{ data }">{{ formatDate(data.date) }}</template>
            <template #filter="{ filterModel }">
              <Calendar
                v-model="filterModel.value"
                date-format="mm/dd/yy"
                placeholder="mm/dd/yyyy"
              />
            </template>
          </Column>
          <Column
            field="balance"
            header="Balance"
            sortable
            data-type="numeric"
            style="min-width: 8rem"
          >
            <template #body="{ data }">{{
              formatCurrency(data.balance)
            }}</template>
            <template #filter="{ filterModel }">
              <InputNumber
                v-model="filterModel.value"
                mode="currency"
                currency="USD"
                locale="en-US"
              />
            </template>
          </Column>
          <Column
            field="status"
            header="Status"
            sortable
            :filter-menu-style="{ width: '14rem' }"
            style="min-width: 10rem"
          >
            <template #body="{ data }">
              <span :class="'customer-badge status-' + data.status">
                {{ data.status }}
              </span>
            </template>
            <template #filter="{ filterModel }">
              <Dropdown
                v-model="filterModel.value"
                :options="statuses"
                placeholder="Any"
                class="p-column-filter"
                :show-clear="true"
              >
                <template #value="slotProps">
                  <span :class="'customer-badge status-' + slotProps.value">
                    {{ slotProps.value }}
                  </span>
                </template>
                <template #option="slotProps">
                  <span :class="'customer-badge status-' + slotProps.option">
                    {{ slotProps.option }}
                  </span>
                </template>
              </Dropdown>
            </template>
          </Column>
          <Column
            field="activity"
            header="Activity"
            sortable
            :show-filter-match-modes="false"
            style="min-width: 10rem"
          >
            <template #body="{ data }">
              <ProgressBar :value="data.activity" :show-value="false" />
            </template>
            <template #filter="{ filterModel }">
              <Slider v-model="filterModel.value" range class="p-m-3"></Slider>
              <div class="p-d-flex p-ai-center p-jc-between p-px-2">
                <span>{{ filterModel.value ? filterModel.value[0] : 0 }}</span>
                <span>
                  {{ filterModel.value ? filterModel.value[1] : 100 }}
                </span>
              </div>
            </template>
          </Column>
          <Column
            header-style="min-width: 4rem; text-align: center"
            body-style="text-align: center; overflow: visible"
          >
            <template #body>
              <Button type="button" icon="pi pi-cog"></Button>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
    <div class="col-12">
      <div class="card">
        <h5>AccordionPanel</h5>
        <Accordion :multiple="true" :active-index="[0]">
          <AccordionTab header="Header I">
            <p style="margin: 0">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </AccordionTab>
          <AccordionTab header="Header II">
            <p style="margin: 0">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
              eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci
              velit, sed quia non numquam eius modi.
            </p>
          </AccordionTab>
          <AccordionTab header="Header III">
            <p style="margin: 0">
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores et quas molestias excepturi sint occaecati cupiditate non
              provident, similique sunt in culpa qui officia deserunt mollitia
              animi, id est laborum et dolorum fuga. Et harum quidem rerum
              facilis est et expedita distinctio. Nam libero tempore, cum soluta
              nobis est eligendi optio cumque nihil impedit quo minus.
            </p>
          </AccordionTab>
        </Accordion>
      </div>
      <div class="card">
        <h5>TabView</h5>
        <TabView>
          <TabPanel header="Header I">
            <p style="margin: 0">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </TabPanel>
          <TabPanel header="Header II">
            <p style="margin: 0">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
              eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci
              velit, sed quia non numquam eius modi.
            </p>
          </TabPanel>
          <TabPanel header="Header III">
            <p style="margin: 0">
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores et quas molestias excepturi sint occaecati cupiditate non
              provident, similique sunt in culpa qui officia deserunt mollitia
              animi, id est laborum et dolorum fuga. Et harum quidem rerum
              facilis est et expedita distinctio. Nam libero tempore, cum soluta
              nobis est eligendi optio cumque nihil impedit quo minus.
            </p>
          </TabPanel>
        </TabView>
      </div>
    </div>
    <div class="col-12">
      <div class="card">
        <h5>Panel</h5>
        <Panel header="Header" :toggleable="true">
          <p style="margin: 0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </Panel>
      </div>
      <div class="card">
        <h5>Fieldset</h5>
        <Fieldset legend="Legend" :toggleable="true">
          <p style="margin: 0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </Fieldset>
      </div>
    </div>
    <div class="col-12 md:col-6">
      <div class="card p-fluid">
        <h5>Overlay Panel</h5>
        <Button
          type="button"
          label="Choose"
          icon="pi pi-search"
          @click="toggle"
        />
        <OverlayPanel
          ref="op"
          append-to="body"
          :show-close-icon="true"
          style="width: 450px"
        >
          <DataTable
            v-model:selection="selectedProduct"
            :value="products"
            selection-mode="single"
            :paginator="true"
            :rows="5"
            @row-select="onProductSelect"
          >
            <Column field="name" header="Name" sortable></Column>
            <Column header="Image">
              <template #body="slotProps">
                <img
                  :src="'demo/images/product/' + slotProps.data.image"
                  :alt="slotProps.data.image"
                  class="product-image"
                />
              </template>
            </Column>
            <Column field="price" header="Price" sortable>
              <template #body="slotProps">{{
                formatCurrency(slotProps.data.price)
              }}</template>
            </Column>
          </DataTable>
        </OverlayPanel>
      </div>
    </div>
    <div class="col-12 md:col-6">
      <div class="card p-fluid">
        <h5>Dialog</h5>
        <Dialog
          v-model:visible="display"
          header="Dialog"
          :style="{ width: '30vw' }"
          :modal="true"
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <template #footer>
            <Button
              label="Dismiss"
              icon="pi pi-check"
              class="p-button-text"
              @click="close"
            />
          </template>
        </Dialog>
        <Button
          label="Show"
          icon="pi pi-external-link"
          class="p-button-secondary"
          @click="open"
        />
      </div>
    </div>
    <div class="col-12 md:col-6">
      <div class="card p-fluid">
        <h5>Confirm Popup</h5>
        <Button
          type="button"
          label="Confirm"
          class="p-button-success"
          icon="pi pi-check"
          @click="confirmWithPopup"
        />
        <ConfirmPopup group="popup"></ConfirmPopup>
      </div>
    </div>
    <div class="col-12 md:col-6">
      <div class="card p-fluid">
        <h5>Confirm Dialog</h5>
        <Button
          type="button"
          label="Confirm"
          class="p-button-help"
          icon="pi pi-check"
          @click="confirmWithDialog"
        />
        <ConfirmDialog group="dialog">></ConfirmDialog>
      </div>
    </div>
    <div class="col-12">
      <div class="card card-w-title">
        <h5>Menubar</h5>
        <Menubar :model="tieredMenuItems">
          <template #end>
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText type="text" placeholder="Search" />
            </span>
          </template>
        </Menubar>
      </div>
    </div>
    <div class="col-12 md:col-6">
      <div class="card">
        <h5>Tiered Menu</h5>
        <TieredMenu :model="tieredMenuItems" />
      </div>
    </div>

    <div class="col-12 md:col-6">
      <div class="card">
        <h5>Plain Menu</h5>
        <Menu :model="menuitems" />
      </div>
    </div>

    <div class="col-12 md:col-6">
      <div class="card">
        <h5>Overlay Menu</h5>

        <Menu ref="menu" :model="menuitems" :popup="true" />
        <Button
          type="button"
          label="Options"
          icon="pi pi-angle-down"
          style="width: auto"
          @click="toggleMenu"
        />
      </div>
    </div>
    <div class="col-12 md:col-6">
      <div class="card" @contextmenu="onContextRightClick">
        <h5>Context Menu</h5>
        Right click to display.
        <ContextMenu ref="contextMenu" :model="contextMenuItems" />
      </div>
    </div>

    <div class="col-12 md:col-6">
      <div class="card">
        <h5>Messages</h5>
        <Message severity="info">Info Message</Message>
        <Message severity="success">Success Message</Message>
        <Message severity="warn">Warning Message</Message>
        <Message severity="error">Error Message</Message>
      </div>
    </div>

    <div class="col-12 md:col-6">
      <div class="card">
        <h5>Toast</h5>

        <Toast />
        <Button
          label="Info"
          class="p-button-info mr-2 mb:p-2"
          @click="showToast('info')"
        />
        <Button
          label="Success"
          class="p-button-success mr-2 mb:p-2"
          @click="showToast('success')"
        />
        <Button
          label="Warn"
          class="p-button-warning mr-2 mb:p-2"
          @click="showToast('warn')"
        />
        <Button
          label="Error"
          class="p-button-danger mb:p-2"
          @click="showToast('error')"
        />
      </div>

      <div class="card">
        <h5>Timeline</h5>
        <Timeline :value="timelineEvents" align="alternate">
          <template #content="slotProps">{{ slotProps.item.status }}</template>
        </Timeline>
      </div>
    </div>

    <div class="col-12 md:col-8">
      <div class="card">
        <h5>Inline Message</h5>
        <div class="p-formgroup-inline" style="margin-bottom: 0.5rem">
          <label for="username1" class="p-sr-only">Username</label>
          <InputText
            id="username1"
            type="text"
            placeholder="Username"
            class="p-invalid mr-2"
          />
          <InlineMessage>Username is required</InlineMessage>
        </div>
        <div class="p-formgroup-inline">
          <label for="email" class="p-sr-only">email</label>
          <InputText id="email" placeholder="Email" class="p-invalid mr-2" />
          <InlineMessage />
        </div>
      </div>
    </div>

    <div class="col-12 md:col-4">
      <div class="card">
        <h5>Helper Text</h5>
        <div class="p-field p-fluid">
          <label for="username2">Username</label>
          <InputText
            id="username2"
            type="text"
            aria-describedby="username-help"
          />
          <small id="username-help" class="p-error"
            >Enter your username to reset your password.</small
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomerService from '../service/CustomerService'
import CountryService from '../service/CountryService'
import ProductService from '../service/ProductService'
import { FilterMatchMode, FilterOperator } from 'primevue/api'

export default {
  data() {
    return {
      customers: null,
      selectedCustomers: null,
      products: null,
      selectedProduct: null,
      filters: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        },
        'country.name': {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        },
        representative: { value: null, matchMode: FilterMatchMode.IN },
        date: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
        },
        balance: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
        },
        status: {
          operator: FilterOperator.OR,
          constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
        },
        activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
        verified: { value: null, matchMode: FilterMatchMode.EQUALS },
      },
      floatValue: null,
      autoValue: null,
      selectedAutoValue: null,
      autoFilteredValue: [],
      calendarValue: null,
      inputNumberValue: null,
      chipsValue: null,
      sliderValue: null,
      ratingValue: null,
      colorValue: '1976D2',
      radioValue: null,
      checkboxValue: [],
      switchValue: false,
      display: false,
      listboxValues: [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' },
      ],
      listboxValue: null,
      dropdownValues: [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' },
      ],
      dropdownValue: null,
      multiselectValue: null,
      multiselectValues: [
        { name: 'Australia', code: 'AU' },
        { name: 'Brazil', code: 'BR' },
        { name: 'China', code: 'CN' },
        { name: 'Egypt', code: 'EG' },
        { name: 'France', code: 'FR' },
        { name: 'Germany', code: 'DE' },
        { name: 'India', code: 'IN' },
        { name: 'Japan', code: 'JP' },
        { name: 'Spain', code: 'ES' },
        { name: 'United States', code: 'US' },
      ],
      toggleValue: false,
      selectButtonValues1: [
        { name: 'Option 1', code: 'O1' },
        { name: 'Option 2', code: 'O2' },
        { name: 'Option 3', code: 'O3' },
      ],
      selectButtonValue1: null,
      selectButtonValues2: [
        { name: 'Option 1', code: 'O1' },
        { name: 'Option 2', code: 'O2' },
        { name: 'Option 3', code: 'O3' },
      ],
      selectButtonValue2: null,
      tieredMenuItems: [
        {
          label: 'Customers',
          icon: 'pi pi-fw pi-table',
          items: [
            {
              label: 'New',
              icon: 'pi pi-fw pi-user-plus',
              items: [
                {
                  label: 'Customer',
                  icon: 'pi pi-fw pi-plus',
                },
                {
                  label: 'Duplicate',
                  icon: 'pi pi-fw pi-copy',
                },
              ],
            },
            {
              label: 'Edit',
              icon: 'pi pi-fw pi-user-edit',
            },
          ],
        },
        {
          label: 'Orders',
          icon: 'pi pi-fw pi-shopping-cart',
          items: [
            {
              label: 'View',
              icon: 'pi pi-fw pi-list',
            },
            {
              label: 'Search',
              icon: 'pi pi-fw pi-search',
            },
          ],
        },
        {
          label: 'Shipments',
          icon: 'pi pi-fw pi-envelope',
          items: [
            {
              label: 'Tracker',
              icon: 'pi pi-fw pi-compass',
            },
            {
              label: 'Map',
              icon: 'pi pi-fw pi-map-marker',
            },
            {
              label: 'Manage',
              icon: 'pi pi-fw pi-pencil',
            },
          ],
        },
        {
          label: 'Profile',
          icon: 'pi pi-fw pi-user',
          items: [
            {
              label: 'Settings',
              icon: 'pi pi-fw pi-cog',
            },
            {
              label: 'Billing',
              icon: 'pi pi-fw pi-file',
            },
          ],
        },
        {
          separator: true,
        },
        {
          label: 'Quit',
          icon: 'pi pi-fw pi-sign-out',
        },
      ],
      menuitems: [
        {
          label: 'Customers',
          items: [
            {
              label: 'New',
              icon: 'pi pi-fw pi-plus',
            },
            {
              label: 'Edit',
              icon: 'pi pi-fw pi-user-edit',
            },
          ],
        },
        {
          label: 'Orders',
          items: [
            {
              label: 'View',
              icon: 'pi pi-fw pi-list',
            },
            {
              label: 'Search',
              icon: 'pi pi-fw pi-search',
            },
          ],
        },
      ],
      contextMenuItems: [
        {
          label: 'Save',
          icon: 'pi pi-save',
        },
        {
          label: 'Update',
          icon: 'pi pi-refresh',
        },
        {
          label: 'Delete',
          icon: 'pi pi-trash',
        },
        {
          separator: true,
        },
        {
          label: 'Options',
          icon: 'pi pi-cog',
        },
      ],
      message: [],
      timelineEvents: [
        {
          status: 'Ordered',
          date: '15/10/2020 10:30',
          icon: 'pi pi-shopping-cart',
          color: '#9C27B0',
          image: 'game-controller.jpg',
        },
        {
          status: 'Processing',
          date: '15/10/2020 14:00',
          icon: 'pi pi-cog',
          color: '#673AB7',
        },
        {
          status: 'Shipped',
          date: '15/10/2020 16:15',
          icon: 'pi pi-shopping-cart',
          color: '#FF9800',
        },
        {
          status: 'Delivered',
          date: '16/10/2020 10:00',
          icon: 'pi pi-check',
          color: '#607D8B',
        },
      ],
    }
  },
  countryService: null,
  computed: {
    containerClass() {
      return [
        'grid',
        {
          'p-input-filled': this.$appState.inputStyle === 'filled',
        },
      ]
    },
  },
  created() {
    this.countryService = new CountryService()
    this.customerService = new CustomerService()
    this.productService = new ProductService()
  },
  mounted() {
    this.countryService.getCountries().then((data) => (this.autoValue = data))
    this.customerService.getCustomersLarge().then((data) => {
      this.customers = data
      this.customers.forEach(
        (customer) => (customer.date = new Date(customer.date))
      )
    })
    this.productService
      .getProductsSmall()
      .then((data) => (this.products = data))
  },
  methods: {
    toggleMenu(event) {
      this.$refs.menu.toggle(event)
    },
    onContextRightClick(event) {
      this.$refs.contextMenu.show(event)
    },
    searchCountry(event) {
      setTimeout(() => {
        if (!event.query.trim().length) {
          this.autoFilteredValue = [...this.autoValue]
        } else {
          this.autoFilteredValue = this.autoValue.filter((country) => {
            return country.name
              .toLowerCase()
              .startsWith(event.query.toLowerCase())
          })
        }
      }, 250)
    },
    addMessage(severity) {
      this.message = [{ severity: severity, content: 'Message Detail' }]
    },
    showToast(severity) {
      this.$toast.add({
        severity: severity,
        summary: 'Message Summary',
        detail: 'Message Detail',
        life: 3000,
      })
    },
    open() {
      this.display = true
    },
    close() {
      this.display = false
    },
    toggle(event) {
      this.$refs.op.toggle(event)
    },
    confirmWithPopup(event) {
      this.$confirm.require({
        target: event.currentTarget,
        group: 'popup',
        message: 'Are you sure you want to proceed?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.$toast.add({
            severity: 'info',
            summary: 'Confirmed',
            detail: 'You have accepted',
            life: 3000,
          })
        },
        reject: () => {
          this.$toast.add({
            severity: 'info',
            summary: 'Rejected',
            detail: 'You have rejected',
            life: 3000,
          })
        },
      })
    },
    confirmWithDialog() {
      this.$confirm.require({
        group: 'dialog',
        header: 'Confirm',
        message: 'Are you sure you want to proceed?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.$toast.add({
            severity: 'info',
            summary: 'Confirmed',
            detail: 'You have accepted',
            life: 3000,
          })
        },
        reject: () => {
          this.$toast.add({
            severity: 'info',
            summary: 'Rejected',
            detail: 'You have rejected',
            life: 3000,
          })
        },
      })
    },
    onProductSelect(event) {
      this.$refs.op.hide()
      this.$toast.add({
        severity: 'info',
        summary: 'Product Selected',
        detail: event.data.name,
        life: 3000,
      })
    },
    formatDate(value) {
      return value.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    },
    formatCurrency(value) {
      return value.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      })
    },
  },
}
</script>

<style scoped lang="scss">
@import '../assets/themes/white-label/_theme.scss';
.image-text {
  vertical-align: middle;
}

.p-progressbar {
  height: 4px;
}

.customer-badge {
  border-radius: 2px;
  padding: 0.25em 0.5rem;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.3px;

  &.status-qualified {
    background-color: #c8e6c9;
    color: #256029;
  }

  &.status-unqualified {
    background-color: #ffcdd2;
    color: #c63737;
  }

  &.status-negotiation {
    background-color: #feedaf;
    color: #8a5340;
  }

  &.status-new {
    background-color: #b3e5fc;
    color: #23547b;
  }

  &.status-renewal {
    background-color: #eccfff;
    color: #694382;
  }

  &.status-proposal {
    background-color: #ffd8b2;
    color: #805b36;
  }
}

.product-image {
  width: 50px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

::v-deep(.p-paginator) {
  .p-paginator-current {
    margin-left: auto;
  }
}
</style>
