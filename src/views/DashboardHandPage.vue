<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="bg-base-200 min-h-screen">
        <div class="grid grid-cols-12">
          <sidebar-view />
          <div class="xl:col-span-9 lg:col-span-8 col-span-12">
            <div class="w-full flex justify-between items-center md:ml-6 bg-base-100 p-6 rounded-bl-3xl">
              <div>
                <h4 class="font-semibold text-base-content">
                  Data Recorded
                  <div class="badge badge-primary">{{ data === null || data === undefined || data === "" ? 0 : Object.keys(data).length }}</div>
                </h4>
              </div>
              <div>
                <div class="dropdown dropdown-bottom dropdown-end px-6">
                  <label tabindex="0" class="avatar">
                    <div class="w-12 mask mask-squircle">
                      <img src="/assets/images/Ninno.png" />
                    </div>
                  </label>
                  <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><a class="text-base-content">Profile</a></li>
                    <li><a class="text-base-content">Logout</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="max-h-[88vh] overflow-y-auto">
              <div class="w-full p-6">
                <progress-view />
                <div class="relative w-full bottom-0 left-0 py-6 mt-12 flex justify-center text-base-content">
                  2023 Developed by <span class="text-primary ml-1 font-semibold"><a href="https://hayago.id" target="_blank">Hayago</a></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import ProgressView from "@/components/ProgressView.vue";
import SidebarView from "@/components/SidebarView.vue";
import { IonContent, IonPage } from "@ionic/vue";
import { onMounted, ref, Ref, watch } from "vue";

const data: Ref<any> = ref([]);
</script>
