<template>
  <div class="xl:col-span-3 lg:col-span-4 col-span-0">
    <div class="drawer lg:drawer-open md:opacity-100 opacity-0 md:relative absolute" id="drawerContent">
      <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content flex flex-col md:col-span-4 items-center justify-center">
        <label for="my-drawer-2" id="openDrawer" class="btn btn-primary drawer-button lg:hidden">Open drawer</label>
      </div>
      <div class="drawer-side">
        <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
        <ul class="menu sticky sticky-top top-0 p-4 pt-8 space-y-3 bg-base-100 md:rounded-r-3xl rounded-none w-80 min-h-full text-base-content">
          <li>
            <router-link class="hover:bg-base-100 focus:bg-base-100 active:bg-base-100" to="/dashboard">
              <img src="/assets/images/logo.png" alt="Logo" class="w-12" />
            </router-link>
          </li>
          <li>
            <router-link class="text-base-content" to="/dashboard">
              <Icon class="text-2xl" icon="solar:home-2-linear" />
              <span>Home</span>
            </router-link>
          </li>
          <li>
            <router-link class="text-base-content" to="/dashboard/profile">
              <Icon class="text-2xl" icon="solar:user-linear" />
              <span>Profile</span>
            </router-link>
          </li>
          <li>
            <router-link class="text-base-content" to="/dashboard/hand">
              <Icon class="text-2xl" icon="solar:hand-shake-linear" />
              <span>Shortcut Hand</span>
            </router-link>
          </li>
          <li class="absolute bottom-0 inline-block hover:bg-base-100 active:bg-base-100 focus:bg-base-100 bg-base-100 left-0 w-full p-6">
            <div class="flex items-center justify-between py-0 px-5">
              <p class="py-4 text-base-content"><Icon icon="pajamas:appearance" class="text-xl inline-block mr-3" /> Appearance</p>
            </div>
            <div class="grid grid-cols-2 hover:bg-base-100 active:bg-base-100 focus:bg-base-100 bg-base-100">
              <ion-button fill="clear" @click="changeTheme('light')" class="btn join-item">Light</ion-button>
              <ion-button fill="clear" @click="changeTheme('dark')" class="btn join-item">Dark</ion-button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, Ref, watch } from "vue";
const theme: Ref<any> = ref("light");
onMounted(() => {
  theme.value = localStorage.getItem("theme") || "light";
  changeTheme(theme.value);
});

function changeTheme(data: string) {
  theme.value = data;
  localStorage.setItem("theme", theme.value);
  document.documentElement.setAttribute("data-theme", theme.value);
}
</script>
