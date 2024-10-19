"use client";
import SecondTitle from "@/components/SecondTitle";
import ThirdTitle from "@/components/ThirdTitle";
import { ContextLoading } from "@/context/context";
import React, { useContext, useEffect } from "react";

const page = () => {
  const { setIsLoading } = useContext(ContextLoading);
  useEffect(() => {
    setIsLoading(false);
  }, []);
  return (
    <div className="py-10 px-6 md:px-20 w-full flex flex-col items-center gap-5">
      <div className="flex flex-col justify-center items-center gap-5 xl:w-[640px] ">
        <div className="flex flex-col gap-2.5">
          <SecondTitle additionalCSS="orange" text={"Mentions légales"} />
          <ThirdTitle additionalCSS="underline" text={"Éditeur du site :"} />
          <p className="md:pr-10">
            Le site Le Bon Petit Plat est édité par un particulier. Conformément à l'article 6-III
            de la loi pour la Confiance dans l’Économie Numérique (LCEN) du 21 juin 2004, les
            coordonnées personnelles de l'éditeur ne sont pas publiées.
            <br />
            Les informations peuvent être obtenues auprès de l'hébergeur du site.
          </p>
        </div>
        <div className="flex flex-col gap-2.5">
          <ThirdTitle additionalCSS="underline" text={"Hébergeur :"} />
          <p className="">Le site Le Bon Petit Plat est hébergé par :</p>
          <ul className="list-disc px-5">
            <li>Heroku Inc., une filiale de Salesforce </li>
            <li>
              Adresse : Salesforce West, 415 Mission Street, Suite 300, San Francisco, CA 94105, USA
            </li>
            <li>Téléphone : +1 (866) 278-1349</li>
            <li> Site web : https://www.heroku.com</li>
          </ul>
        </div>
        <div className="flex flex-col gap-2.5">
          <ThirdTitle additionalCSS="underline" text={"Propriété intellectuelle :"} />
          <p className="md:pr-5">
            Tous les contenus présents sur le site "Le Bon Petit Plat" (textes, images, logos,
            vidéos, etc.) sont protégés par les dispositions du Code de la propriété intellectuelle
            et sont la propriété exclusive de leurs auteurs respectifs. Toute reproduction,
            diffusion ou utilisation de ces contenus sans autorisation préalable est strictement
            interdite.
          </p>
        </div>
        <div className="flex flex-col gap-2.5">
          <ThirdTitle additionalCSS="underline" text={"Responsabilité :"} />
          <p className="md:pr-7">
            L'éditeur du site décline toute responsabilité quant aux contenus publiés par les
            utilisateurs. Cependant, tout contenu manifestement illicite peut être signalé et sera
            retiré après vérification.
          </p>
        </div>
        <div className="flex flex-col gap-2.5">
          <ThirdTitle additionalCSS="underline" text={"Contact :"} />
          <p className="md:pr-6">
            Pour toute demande d'information ou réclamation, vous pouvez nous contacter à l'adresse
            suivante : contact@lbpp.com
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-5 xl:w-[640px]">
        <div className="flex flex-col gap-2.5 px-0.5">
          <SecondTitle additionalCSS="orange" text={"Conditions Générales d'Utilisation"} />
          <ThirdTitle additionalCSS="text-start" text={"Article 1 : Objet"} />
          <p>
            Les présentes Conditions Générales d'Utilisation (CGU) encadrent juridiquement
            l'utilisation des services du site Le Bon Petit Plat.
          </p>
          <p className="md:pr-4">
            Le Bon Petit Plat est un forum de partage de recettes de cuisine où les utilisateurs
            peuvent s'inscrire, publier des recettes et interagir avec la communauté.
          </p>
          <ThirdTitle additionalCSS="text-start" text={"Article 2 : Acceptation des CGU"} />
          <p className="pr-2">
            En accédant et en utilisant le site, l'utilisateur reconnaît avoir pris connaissance des
            présentes CGU et les accepter sans réserve.
          </p>
          <ThirdTitle additionalCSS="text-start" text={"Article 3 : Inscription au site"} />
          <p className="pr-[10px] md:pr-6">
            Pour accéder à certaines fonctionnalités du site, telles que la publication de recettes,
            l'utilisateur doit s'inscrire en créant un compte. Il s'engage à fournir des
            informations exactes, complètes et à jour. L’utilisateur est seul responsable de la
            confidentialité de son mot de passe.
          </p>
          <ThirdTitle additionalCSS="text-start" text={"Article 4 : Publication de contenu"} />
          <p className="pr-[10px] md:pr-6">
            L’utilisateur peut publier des recettes, commentaires et autres contenus sur le site. En
            publiant, il garantit que les contenus respectent la législation en vigueur et ne
            contiennent aucun élément diffamatoire, illégal ou inapproprié. L’équipe de modération
            se réserve le droit de supprimer tout contenu qui contreviendrait à ces règles.
          </p>
          <ThirdTitle
            additionalCSS="text-start"
            text={"Article 5 : Responsabilité de l'utilisateur"}
          />
          <p className="pr-2 md:pr-8">
            L'utilisateur est responsable des contenus qu'il publie sur le site. L'éditeur du site
            ne saurait être tenu responsable des contenus publiés par les utilisateurs. Toutefois,
            en cas de signalement d'un contenu illicite, le site se réserve le droit de le supprimer
            après vérification.
          </p>
          <ThirdTitle additionalCSS="text-start" text={"Article 6 : Modification des CGU"} />
          <p className="pr-2">
            Le site se réserve le droit de modifier les présentes CGU à tout moment. Les
            utilisateurs seront informés des modifications soit par e-mail, soit via une
            notification sur le site. L’utilisation continue du site après modification vaut
            acceptation des nouvelles CGU.
          </p>
          <ThirdTitle additionalCSS="text-start" text={"Article 7 : Loi applicable"} />
          <p className="pr-2">
            Les présentes CGU sont régies par la législation française. En cas de litige, les
            tribunaux français seront seuls compétents.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-5 xl:w-[640px]">
        <div className="flex flex-col gap-2.5">
          <SecondTitle additionalCSS="orange" text={"Protection des données personnelles"} />
          <p className="pr-[18px]">
            Conformément au Règlement Général sur la Protection des Données (RGPD), Le Bon Petit
            Plat s'engage à assurer la protection des données personnelles de ses utilisateurs.
            Cette section décrit comment nous collectons, utilisons, stockons et protégeons les
            informations personnelles.
          </p>
          <ThirdTitle additionalCSS="text-start" text={"1. Données collectées :"} />
          <div>
            <p>Lors de l'inscription sur le site, nous collectons les informations suivantes :</p>
            <ul className="list-disc pl-5">
              <li>Nom d'utilisateur</li>
              <li>Adresse e-mail</li>
              <li>Nom</li>
              <li>Prénom</li>
              <li>
                Toute autre information fournie volontairement par l'utilisateur dans son profil.
              </li>
            </ul>
          </div>
          <ThirdTitle additionalCSS="text-start" text={"2. Utilisation des données :"} />
          <div>
            <p>Les données personnelles collectées sur le site sont utilisées pour :</p>
            <ul className="list-disc px-4">
              <li>Gérer les comptes utilisateurs ;</li>
              <li className="md:pr-2">
                Permettre l'interaction entre les utilisateurs (publication de recettes,
                commentaires, etc.) ;
              </li>
            </ul>
          </div>
          <ThirdTitle
            additionalCSS="text-start"
            text={"3. Droit d’accès, de rectification et de suppression :"}
          />
          <p className="md:pr-7">
            Conformément à la loi "Informatique et Libertés", les utilisateurs disposent d’un droit
            d’accès, de rectification et de suppression des données personnelles les concernant.
            Pour exercer ces droits, vous pouvez contacter contact@lbpp.com.
          </p>
          <ThirdTitle additionalCSS="text-start" text={"4. Partage des données :"} />
          <p className="pr-4 md:pr-10">
            Les données personnelles des utilisateurs ne seront jamais partagées avec des tiers sans
            leur consentement explicite, sauf en cas de demande légale par une autorité compétente.
          </p>
          <ThirdTitle additionalCSS="text-start" text={"5. Durée de conservation des données :"} />
          <p className="pr-3">
            Les données sont conservées aussi longtemps que le compte utilisateur est actif. Si
            l’utilisateur souhaite supprimer son compte, toutes les données personnelles associées
            seront définitivement supprimées dans un délai raisonnable.
          </p>
          <ThirdTitle additionalCSS="text-start" text={"6. Sécurité des données :"} />
          <p className="pr-5 md:pr-10">
            Nous mettons en œuvre toutes les mesures techniques et organisationnelles nécessaires
            pour protéger les données personnelles contre toute destruction accidentelle, perte,
            altération ou divulgation non autorisée.
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
