<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="bg-base-200 min-h-screen">
        <div class="grid grid-cols-12">
          <sidebar-view />
          <div class="xl:col-span-9 lg:col-span-8 col-span-12">
            <div class="w-full flex justify-center items-center md:ml-6 bg-base-100 p-6 rounded-bl-3xl">
              <h4 class="font-semibold text-base-content">Profile Team</h4>
            </div>
            <div class="max-h-[88vh] overflow-y-auto">
              <div class="w-full p-6">
                <div class="space-y-3 gap-6">
                  <div class="grid gap-6 grid-cols-1 items-center lg:grid-cols-3">
                    <div v-for="team in teams" :key="team.id">
                      <div class="card w-80 h-80 bg-base-100 shadow-xl">
                        <figure>
                          <img :src="team.image" :alt="team.name" />
                        </figure>
                        <div class="card-body">
                          <h2 class="card-title text-base-content">{{ team.name }}</h2>
                          <p class="text-base-content">{{ team.role }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
import SidebarView from "@/components/SidebarView.vue";
import { IonContent, IonPage } from "@ionic/vue";
import { onMounted, ref, Ref, watch } from "vue";
import { db, storage } from "@/firebase";
import { onValue, ref as dbRef } from "firebase/database";
import { ref as storageRef, getDownloadURL } from "firebase/storage";

const teams = ref([]);

onMounted(() => {
  getDataFromFirebase();
});

const getDataFromFirebase = () => {
  const teamsRef = dbRef(db, "data/teams");

  onValue(teamsRef, async (snapshot) => {
    const teamsData = snapshot.val();
    const teamsArray = [];

    for (const key in teamsData) {
      if (Object.prototype.hasOwnProperty.call(teamsData, key)) {
        const team = teamsData[key];

        let imageURL = "";
        if (team.imageURL) {
          const imageRef = storageRef(storage, team.image);
          imageURL = await getDownloadURL(imageRef);
        }

        teamsArray.push({
          id: key,
          name: team.name,
          role: team.role,
          image: team.image,
        });
      }
    }

    teams.value = teamsArray;
  });
};
</script>
