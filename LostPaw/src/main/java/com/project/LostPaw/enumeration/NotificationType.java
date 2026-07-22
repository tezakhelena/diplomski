package com.project.LostPaw.enumeration;
import lombok.Getter;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Getter
public enum NotificationType {
    KOMENTAR(1, "Dodan komentar na oglasu '{naslovOglasa}'", "Korisnik '{username}' ostavio je komentar na Vašem oglasu '{naslovOglasa}'"),
    PREGLEDI(2, "Dosegnuto 100 pregleda na oglasu '{naslovOglasa}'", "Vaš oglas '{naslovOglasa}' je dosegao 100 pregleda!"),
    OBAVIJEST(3, "Dodan oglas '{naslovOglasa}'", "Vaš oglas '{naslovOglasa}' je uspješno objavljen!"),
    PRIJAVLJEN_OGLAS(4, "Prijavljen oglas '{naslovOglasa}'", "Oglas '{naslovOglasa} je prijavljen.'"),

    BLOKIRAN_OGLAS(114, "Blokiran oglas zbog nekoliko prijava", "Vaš oglas '{naslovOglasa}' je blokiran zbog nekoliko prijava od strane više korisnika"),
    KRŠENJA_PRAVILA_PLATFORME(111,"Kršenja pravila platforme",
                                      "Vaš oglas '{naslovOglasa}' je blokiran zbog mogućeg kršenja pravila platforme, kao što su neprikladan sadržaj, spam ili komercijalna upotreba."),
    ZABRINUTOST_ZA_DOBROBIT_ZIVOTINJA(112, "Zabrinutost za dobrobit ljubimca",
                                              "Vaš oglas '{naslovOglasa}' je blokiran zbog mogućeg kršenja pravila platforme, kao što su dezinformacije o ljubimcu, iskorištavanje oglasa, etička kršenja."),
    SIGURNOSNI_PROBLEMI(113, "Sigurnosni problemi",
                                "Vaš oglas '{naslovOglasa}' je blokiran zbog mogućeg kršenja pravila platforme, kao što su objava lažnog oglasa, potencijalna šteta za životinju, prevaranti koji ciljaju vlasnike."),

    REGISTRACIJA(9, "Registracija izvršena '{datumRegistracije}'", ""),
    VERIFIKACIJA_MAILA(10, "Izvršena verifikacija e-maila", "Uspješno ste verificirali svoju e-mail adresu. Sada možete dovršiti svoj profil u postavkama i kreirati oglase za izgubljene ili pronađene životinje, pregledavati oglase drugih korisnika i kontaktirati ih putem platforme."),

    SLICNI_OGLAS(11, "Objavljen slični oglas", "Objavljen je sličan oglas suprotne kategorije. Provjerite je li riječ o Vašem ljubimcu."),
    KORISNIK_ZUPANIJA(12, "Oglas u Vašoj blizini", "Pronađena nova objava u Vašem mjestu! Provjerite detalje i pomozite u potrazi ili provjerite je li riječ o Vašem ljubimcu."),

    OBUSTAVLJEN_RACUN(13, "Obustavljen korisnički račun", "{razlog}."),
    PONOVNO_AKTIVIRAN_RACUN(14, "Ponovno aktiviran račun.", "Vaš korisnički račun je ponovno aktiviran."),

    ZAHTJEV_ZA_UDOMLJAVANJEM(15, "Zahtjev za udomljavanjem.", "Zaprimili ste zahtjev za udomljavanjem za napuštenog ljubimca kojeg ste objavili. Oglas je stavljen u status 'U procesu udomljavanja', a zahtjev možete vidjeti pod opcijom 'Zaprimljeni zahtjevi'."),
    ZAHTJEV_U_RAZMATRANJU(16, "Zahtjev u razmatranju", "Oglašivač je otvorio vaš zahtjev za udomljavanjem i trenutno ga razmatra. Molimo pričekajte daljnje obavijesti."),
    OBAVLJENA_PROCJENA(17, "Rezultat procjene u tijeku", "Vaš razgovor i procjena s oglašivačem je obavljen. Sada čekamo konačnu potvrdu o mogućnosti udomljavanja. Bit ćete obaviješteni čim dobijemo odgovor."),
    ZAHTJEV_ODOBREN(18, "Zahtjev odobren", "Vaš zahtjev za udomljavanjem je odobren. Sljedeći koraci uključuju daljnju provjeru i dogovore za završetak procesa. "),

    ZAHTJEV_ODBIJEN(19, "Zahtjev odbijen", "Nažalost, vaš zahtjev za udomljavanjem nije odobren. Razlog odbijanja možete pogledati pod opcijom 'Poslani zahtjevi'. Hvala na razumijevanju."),

    ZAHTJEV_OTKAZAN(20, "Zahtjev otkazan", "Podnositelj zahtjeva je otkazao svoj zahtjev za udomljavanjem. Detalje o otkazivanju možete vidjeti pod opcijom 'Zaprimljeni zahtjevi'."),

    UDOMLJAVANJE_ODOBRENO(22, "Udomljavanje odobreno", "Oglašivač je odobrio udomljavanje. Nakon što oglašivač pripremi svu dokumentaciju, slijedi potpisivanje ugovora."),
    UDOMLJAVANJE_ODBIJENO(23, "Udomljavanje odbijeno", "Nažalost, oglašivač je nakon Vašeg razgovora i procjene odbio Vaš zahtjev za udomljavanje. Razlog odbijanja možete pogledati pod opcijom 'Poslani zahtjevi'. Hvala na vašem interesu."),
    POTPISIVANJE_UGOVORA(24, "Potpisivanje ugovora", "Oglašivač je dodao ugovor za udomljavanje šapice, kojeg možete vidjeti na detaljima Vašeg zahtjeva za udomljavanje. Molimo potpišite ugovor kako bi završili proces. "),
    ZAVRSEN_PROCES(25, "Završen proces udomljavanja", "Uspješno ste potpisali ugovor s oglašivačem za udomljavanje šapice. Čestitamo, postali ste vlasnik predivne napuštene šapice. Hvala vam što ste pružili dom ljubimcu u potrebi!"),
    POTPISIVANJE_UZIVO(26, "Potpisivanje ugovora", "Oglašivač je odabrao potpisivanje ugovora uživo. Molimo kontaktirajte oglašivača kako biste dogovorili termin i mjesto potpisivanja ugovora. Nakon što potpišete ugovor, proces udomljavanja bit će završen."),
    ODGOVOR_NA_UPIT(27, "Pitanja i odgovori", "Dobili ste odgovor na Vaš upit. Možete ga vidjeti pod opcijom Moji upiti na Pitanja i odgovori."),
    POSLAN_UPIT(28, "Pitanja i odgovori", "Postoje nova pitanja u aplikaciji na koja bi mogli dati odgovor"),
    PODNOSITELJ_POTPISAO(29, "Potpisivanje ugovora", "Podnositelj zahtjeva je uspješno potpisao ugovor te Vam je ugovor vraćen radi Vašeg potpisa. Molimo da potpišete ugovor, nakon čega će proces udomljavanja bit završen.");


    private Integer code;
    private String sadrzaj;
    private String notification;

    private NotificationType(Integer code, String sadrzaj, String notification){
        this.code = code;
        this.sadrzaj = sadrzaj;
        this.notification = notification;
    }

    public static String getNotificationByCode(String naslovOglasa, String username) {
        for (NotificationType status : NotificationType.values()) {
            return status.getNotification().replace("{naslovOglasa}", naslovOglasa)
                    .replace("{username}", username);
        }
        return "";
    }

    public static String getNotificationByCode(Integer code, String naslovOglasa) {
        for (NotificationType status : NotificationType.values()) {
            if (status.getCode().equals(code)) {
                return status.getNotification().replace("{naslovOglasa}", naslovOglasa);
            }
        }
        throw new IllegalArgumentException("Invalid code: " + code);
    }

    public String getFormattedMessage(String naslovOglasa, String username) {
        return sadrzaj
                .replace("{naslovOglasa}", naslovOglasa)
                .replace("{username}", username);
    }

    public String getFormattedMessageNaslovOglasa(String naslovOglasa) {
        return sadrzaj.replace("{naslovOglasa}", naslovOglasa);
    }

    public String getFormattedMessageDatum(LocalDate datumRegistracije) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy");
        String formattedDate = datumRegistracije.format(formatter);

        return sadrzaj.replace("{datumRegistracije}", formattedDate);
    }

    public String getFormattedNotification(String naslovOglasa, String username) {
        return notification
                .replace("{naslovOglasa}", naslovOglasa)
                .replace("{username}", username);
    }

    public String getFormattedNotificationOglas(String naslovOglasa) {
        return notification.replace("{naslovOglasa}", naslovOglasa);
    }

    public String getFormattedNotificationRacun(String razlog) {
        return notification.replace("{razlog}", razlog);
    }

    public static String getSadrzajByCode(Integer code) {
        for (NotificationType status : NotificationType.values()) {
            if (status.getCode().equals(code)) {
                return status.getSadrzaj();
            }
        }
        throw new IllegalArgumentException("Invalid code: " + code);
    }

}
