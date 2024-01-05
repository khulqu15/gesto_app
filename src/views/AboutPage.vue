<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="bg-base-100">
        <navbar-view active="home" />
        <div id="container" class="container mx-auto pb-6 mt-6 lg:px-12">
          <div class="px-6 py-0 relative mt-4 -top-8 inline-block">
            <h2 class="md:text-4xl text-2xl leading-relaxed text-base-content break-words">
              Gesto Hayago
              <div class="inline-block md:w-72 w-48 h-10 overflow-hidden rounded-2xl relative top-1">
                <img src="/assets/images/wall3.jpg" class="w-full h-full object-center object-cover absolute top-0 left-0" alt="Image" />
              </div>
              <br />
              Empowering Voices, One Smart Bracelet and Glove at a Time.
            </h2>
          </div>
          <div class="lg:flex inline-block px-6 items-center my-12 relative">
            <div class="max-w-md w-full h-[32rem] relative overflow-hidden rounded-3xl bg-primary">
              <img src="/assets/images/about1.jpg" class="w-full h-full object-center object-cover absolute top-0 left-0" alt="Image" />
            </div>
            <img src="/assets/images/hayago.png" class="w-24 absolute -top-8 right-2 lg:hidden inline-block" alt="Hayago" />
            <div class="lg:w-3/4 w-full p-8 bg-base-100/50 md:-left-12 -left-4 md:top-0 -top-12 relative backdrop-blur-xl rounded-3xl">
              <img src="/assets/images/hayago.png" class="w-24 absolute -top-12 -left-8 lg:inline-block hidden" alt="Hayago" />
              <h3 class="text-3xl leading-relaxed text-base-content">Hayago: Berawal Dari Antusiasme Terhadap Teknologi IoT dan AI</h3>
              <p class="text-base-content">
                Dalam era digital saat ini, teknologi Internet of Things (IoT) dan Kecerdasan Buatan (AI) telah membuka peluang inovasi yang tak terbatas. Hayago, yang berdiri di tengah gelombang revolusi teknologi ini, didorong oleh
                antusiasme mendalam terhadap potensi yang ditawarkan oleh IoT dan AI. Berawal dari visi sederhana untuk mengintegrasikan teknologi canggih dalam kehidupan sehari-hari, Hayago kini telah berkembang menjadi pelopor dalam
                bidang teknologi pendeteksian. Saat ini, dengan dedikasi dan komitmen yang kuat, tim Hayago tengah fokus mengerjakan proyek ambisius: pendeteksian kerusakan jalan. Dengan menggabungkan keahlian dalam IoT dan AI, Hayago
                bertujuan untuk menciptakan solusi yang tidak hanya efisien tetapi juga dapat meningkatkan keselamatan dan kenyamanan bagi pengguna jalan raya.
              </p>
            </div>
            <div class="max-w-md w-full h-[32rem] relative overflow-hidden rounded-3xl bg-primary">
              <img src="/assets/images/about2.png" class="w-full h-full object-center object-cover absolute top-0 left-0" alt="Image" />
            </div>
          </div>
        </div>
        <div class="relative w-full bottom-0 left-0 py-6 mt-12 flex justify-center text-base-content">
          2023 Developed by <span class="text-primary ml-1 font-semibold"><a href="https://hayago.id" target="_blank">Hayago</a></span>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import NavbarView from "@/components/NavbarView.vue";
import { IonContent, IonPage } from "@ionic/vue";
import { onMounted, ref, Ref, watch } from "vue";
import { db, storage } from "@/firebase";
import { onValue, ref as dbRef } from "firebase/database";
import { ref as storageRef, getDownloadURL } from "firebase/storage";
import { image } from "@tensorflow/tfjs";

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

        let imageURL = "https://firebasestorage.googleapis.com/v0/b/gesto-d6223.appspot.com/o/team%2F" + team.image + "?alt=media&token=4fce7bdf-3a6e-4a99-adb7-35487f03f75e";
        if (team.imageURL) {
          const imageRef = storageRef(storage, team.imageURL);
          imageURL = await getDownloadURL(imageRef);
        }

        teamsArray.push({
          id: key,
          name: team.name,
          role: team.role,
          image: imageURL,
        });
      }
    }

    teams.value = teamsArray;
  });
};
</script>
