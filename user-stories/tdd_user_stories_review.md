# **Implémentation des Reviews**

## **1. Création d'une Review**

**En tant que** utilisateur,  
**Je veux** pouvoir laisser une review sur un produit,  
**Afin de** partager mon avis avec d'autres clients.

### **Critères d'acceptation :**  
1. L'utilisateur peut accéder à un formulaire pour laisser une review.  
2. Les champs requis sont :  
   - **Note** (obligatoire, entre 1 et 5)  
   - **Commentaire** (optionnel, texte libre)  
   - **Identifiant du produit** (obligatoire)
Si un des champs n'est pas rempli, une erreur 500 est renvoyée  
3. Si la review est valide, elle est enregistrée dans la base de données.  
4. Si le produit n'existe pas, un message d'erreur s'affiche : **"Produit introuvable."**  avec le code 404
5. Après validation, un message de confirmation s'affiche : **"Votre avis a été enregistré avec succès."**  avec le code 201

---

## **2. Affichage des Reviews**

**En tant que** utilisateur,  
**Je veux** pouvoir consulter les avis laissés sur un produit,  
**Afin de** me faire une idée de sa qualité avant achat.

### **Critères d'acceptation :**  
1. L'utilisateur peut accéder à la liste des reviews d'un produit.  
2. Chaque review affichée contient :  
   - **La note attribuée** (de 1 à 5 étoiles)  
   - **Le commentaire de l'utilisateur** (s'il en a laissé un), avec 100 caractères maximum affichée  
   - **La date de publication**  
   - **Le nom du client** (ou "Utilisateur anonyme" si non disponible)  
3. Si le produit n'a pas encore de review, un message s'affiche : **"Aucune review disponible pour ce produit."** 

---

## **3. Affichage d'une Review**

**En tant que** utilisateur,  
**Je veux** pouvoir consulter une review de manière détaillée,  
**Afin de** avoir plus de détail sur la review en question.

### **Critères d'acceptation :**  
1. L'utilisateur peut accéder à une review  
2. la review affichée contient :  
   - **La note attribuée** (de 1 à 5 étoiles)  
   - **Le commentaire de l'utilisateur** (s'il en a laissé un), affiché en entier
   - **La date de publication**  
   - **Le nom du client** (ou "Utilisateur anonyme" si non disponible)  
3. Si la review n'existe pas on renvoie l'erreur ("Review introuvable") avec une erreur 404  

---

## **4. Modification d'une Review**

**En tant que** utilisateur,  
**Je veux** pouvoir modifier ma review,  
**Afin de** mettre à jour mon avis sur un produit.

### **Critères d'acceptation :**  
1. L'utilisateur peut accéder à un formulaire pour modifier sa propre review.  
2. Seules les reviews de l'utilisateur connecté peuvent être modifiées.  
3. Les champs modifiables sont :  
   - **Note**  
   - **Commentaire**  
4. Après modification, la review est mise à jour dans la base de données.  
5. Un message de confirmation s'affiche : **"Votre avis a été mis à jour avec succès."**  
6. Si la review n'existe pas ou appartient à un autre utilisateur, un message d'erreur s'affiche : **"Vous ne pouvez pas modifier cette review."** avec un code 403

---

## **5. Suppression d'une Review**

**En tant que** utilisateur,  
**Je veux** pouvoir supprimer ma review,  
**Afin de** retirer mon avis sur un produit.

### **Critères d'acceptation :**  
1. L'utilisateur peut accéder à une option pour supprimer sa propre review.  
2. La review doit supprimée de la base de données.  
4. Un message de confirmation s'affiche : **"Votre avis a été supprimé avec succès."**  
5. Si la review n'existe pas ou appartient à un autre utilisateur, un message d'erreur s'affiche : **"Vous ne pouvez pas supprimer cette review."** code 403
