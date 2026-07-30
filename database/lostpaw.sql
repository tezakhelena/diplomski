--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0
-- Dumped by pg_dump version 17.0

-- Started on 2026-07-30 09:46:19 CEST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 3851 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- TOC entry 252 (class 1259 OID 17953)
-- Name: adoption_req_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.adoption_req_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.adoption_req_seq OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 251 (class 1259 OID 17917)
-- Name: adoption_requests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.adoption_requests (
    adoption_id bigint DEFAULT nextval('public.adoption_req_seq'::regclass) NOT NULL,
    pet_ad_id bigint,
    user_id bigint,
    experience character varying(255),
    environment character varying(255),
    reason character varying(255),
    created_at timestamp(6) without time zone,
    ad_owner_id bigint,
    is_evaluated boolean,
    household_members character varying(255),
    schedule character varying(255),
    allergies character varying(255),
    address character varying(255),
    status_id bigint,
    is_open boolean
);


ALTER TABLE public.adoption_requests OWNER TO postgres;

--
-- TOC entry 261 (class 1259 OID 24610)
-- Name: attribute_types; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.attribute_types (
    id bigint NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.attribute_types OWNER TO postgres;

--
-- TOC entry 244 (class 1259 OID 17670)
-- Name: vrijednost_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.vrijednost_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.vrijednost_id_seq OWNER TO postgres;

--
-- TOC entry 243 (class 1259 OID 17663)
-- Name: attributes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.attributes (
    attribute_id bigint DEFAULT nextval('public.vrijednost_id_seq'::regclass) NOT NULL,
    value character varying(255),
    attribute_type integer,
    description character varying(255)
);


ALTER TABLE public.attributes OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 16848)
-- Name: blokirani_oglasi_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.blokirani_oglasi_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.blokirani_oglasi_id_seq OWNER TO postgres;

--
-- TOC entry 236 (class 1259 OID 17219)
-- Name: pasmina_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pasmina_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.pasmina_id_seq OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 17207)
-- Name: breeds; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.breeds (
    breed_id bigint DEFAULT nextval('public.pasmina_id_seq'::regclass) NOT NULL,
    name character varying(255),
    species_id bigint
);


ALTER TABLE public.breeds OWNER TO postgres;

--
-- TOC entry 259 (class 1259 OID 24578)
-- Name: business_profiles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.business_profiles (
    user_id bigint NOT NULL,
    oib character varying(255) NOT NULL,
    website character varying(255),
    business_type_id bigint NOT NULL,
    business_id bigint NOT NULL
);


ALTER TABLE public.business_profiles OWNER TO postgres;

--
-- TOC entry 260 (class 1259 OID 24593)
-- Name: business_profiles_business_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.business_profiles_business_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.business_profiles_business_id_seq OWNER TO postgres;

--
-- TOC entry 3852 (class 0 OID 0)
-- Dependencies: 260
-- Name: business_profiles_business_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.business_profiles_business_id_seq OWNED BY public.business_profiles.business_id;


--
-- TOC entry 227 (class 1259 OID 16834)
-- Name: komentari_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.komentari_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.komentari_id_seq OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16815)
-- Name: comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comments (
    comment_id bigint DEFAULT nextval('public.komentari_id_seq'::regclass) NOT NULL,
    pet_ad_id bigint,
    user_id bigint,
    content character varying(255),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.comments OWNER TO postgres;

--
-- TOC entry 263 (class 1259 OID 24674)
-- Name: contact_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.contact_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.contact_id_seq OWNER TO postgres;

--
-- TOC entry 254 (class 1259 OID 18036)
-- Name: ugovor_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ugovor_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ugovor_id_seq OWNER TO postgres;

--
-- TOC entry 253 (class 1259 OID 18005)
-- Name: contracts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contracts (
    contract_id bigint DEFAULT nextval('public.ugovor_id_seq'::regclass) NOT NULL,
    adoption_id bigint,
    file_name character varying(255),
    uploaded_at timestamp without time zone,
    new_file_name character varying(255),
    user_id bigint,
    signed_status integer
);


ALTER TABLE public.contracts OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 16999)
-- Name: counties; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.counties (
    county_id bigint NOT NULL,
    name character varying(255)
);


ALTER TABLE public.counties OWNER TO postgres;

--
-- TOC entry 258 (class 1259 OID 18134)
-- Name: upit_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.upit_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.upit_id_seq OWNER TO postgres;

--
-- TOC entry 257 (class 1259 OID 18105)
-- Name: inquiries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inquiries (
    inquiry_id bigint DEFAULT nextval('public.upit_id_seq'::regclass) NOT NULL,
    question character varying(255),
    user_id bigint,
    answer character varying(255),
    responder_id bigint,
    type bigint,
    created_at timestamp without time zone,
    replied_at timestamp without time zone
);


ALTER TABLE public.inquiries OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16768)
-- Name: kategorije_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.kategorije_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.kategorije_id_seq OWNER TO postgres;

--
-- TOC entry 241 (class 1259 OID 17429)
-- Name: kontakt_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.kontakt_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.kontakt_id OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16729)
-- Name: korisnik_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.korisnik_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.korisnik_id_seq OWNER TO postgres;

--
-- TOC entry 239 (class 1259 OID 17398)
-- Name: korisnik_povijest_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.korisnik_povijest_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.korisnik_povijest_id OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 17062)
-- Name: korisnik_prava_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.korisnik_prava_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.korisnik_prava_id OWNER TO postgres;

--
-- TOC entry 237 (class 1259 OID 17237)
-- Name: ljubimac_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ljubimac_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ljubimac_id_seq OWNER TO postgres;

--
-- TOC entry 238 (class 1259 OID 17340)
-- Name: notifikacija_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.notifikacija_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.notifikacija_id_seq OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16767)
-- Name: oglas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.oglas_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.oglas_id_seq OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 17028)
-- Name: oglas_lokacija_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.oglas_lokacija_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.oglas_lokacija_id OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 16832)
-- Name: oglas_slike_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.oglas_slike_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.oglas_slike_id OWNER TO postgres;

--
-- TOC entry 262 (class 1259 OID 24654)
-- Name: pet_ad_contact; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pet_ad_contact (
    contact_id bigint DEFAULT nextval('public.contact_id_seq'::regclass) NOT NULL,
    pet_ad_id bigint NOT NULL,
    sender_id bigint NOT NULL,
    receiver_id bigint NOT NULL,
    subject character varying(255),
    message character varying(255),
    created_at timestamp without time zone,
    is_read boolean,
    answer character varying(255),
    replied_at timestamp without time zone
);


ALTER TABLE public.pet_ad_contact OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 16836)
-- Name: pet_ad_history; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pet_ad_history (
    history_id bigint DEFAULT nextval('public.blokirani_oglasi_id_seq'::regclass) NOT NULL,
    pet_ad_id bigint,
    changed_at date,
    status_id bigint,
    user_id bigint,
    comment character varying(255),
    rate integer,
    reason character varying(255)
);


ALTER TABLE public.pet_ad_history OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 16803)
-- Name: pet_ad_pictures; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pet_ad_pictures (
    picture_id bigint DEFAULT nextval('public.oglas_slike_id'::regclass) NOT NULL,
    pet_ad_id bigint,
    url character varying(255),
    is_first boolean DEFAULT false
);


ALTER TABLE public.pet_ad_pictures OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16743)
-- Name: pet_ads; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pet_ads (
    pet_ad_id bigint DEFAULT nextval('public.oglas_id_seq'::regclass) NOT NULL,
    notes text,
    created_at date,
    category_id bigint,
    status_id bigint,
    user_id bigint,
    county_id bigint,
    pet_id bigint,
    naslov character varying(255),
    views integer,
    city character varying(255),
    reward numeric(10,2),
    generated_name character varying(255)
);


ALTER TABLE public.pet_ads OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 17169)
-- Name: pets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pets (
    pet_id bigint DEFAULT nextval('public.ljubimac_id_seq'::regclass) NOT NULL,
    missing_date date,
    status_id bigint,
    species_id bigint,
    gender character varying(255),
    maturity character varying(255),
    breed_id bigint,
    name character varying(255),
    fur_color character varying(255)
);


ALTER TABLE public.pets OWNER TO postgres;

--
-- TOC entry 245 (class 1259 OID 17806)
-- Name: poruka_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.poruka_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.poruka_id_seq OWNER TO postgres;

--
-- TOC entry 248 (class 1259 OID 17845)
-- Name: preference_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.preference_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.preference_id_seq OWNER TO postgres;

--
-- TOC entry 242 (class 1259 OID 17541)
-- Name: profil_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.profil_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.profil_id_seq OWNER TO postgres;

--
-- TOC entry 246 (class 1259 OID 17823)
-- Name: razgovor_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.razgovor_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.razgovor_id_seq OWNER TO postgres;

--
-- TOC entry 250 (class 1259 OID 17872)
-- Name: recenzija_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.recenzija_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.recenzija_id_seq OWNER TO postgres;

--
-- TOC entry 249 (class 1259 OID 17860)
-- Name: reviews; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reviews (
    review_id bigint DEFAULT nextval('public.recenzija_id_seq'::regclass) NOT NULL,
    rate integer,
    comment character varying(255),
    user_id bigint
);


ALTER TABLE public.reviews OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 16889)
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    role_id bigint NOT NULL,
    name character varying(255)
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16770)
-- Name: statusi_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.statusi_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.statusi_id OWNER TO postgres;

--
-- TOC entry 240 (class 1259 OID 17399)
-- Name: user_history; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_history (
    history_id bigint DEFAULT nextval('public.korisnik_povijest_id'::regclass) NOT NULL,
    user_id bigint,
    content character varying(255),
    created_at timestamp without time zone,
    created_by bigint,
    notification character varying(255),
    is_read integer,
    type integer,
    pet_ad_id bigint
);


ALTER TABLE public.user_history OWNER TO postgres;

--
-- TOC entry 247 (class 1259 OID 17835)
-- Name: user_notification_preferences; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_notification_preferences (
    preference_id bigint DEFAULT nextval('public.preference_id_seq'::regclass) NOT NULL,
    user_id bigint,
    type integer,
    receive_notification boolean
);


ALTER TABLE public.user_notification_preferences OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16722)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id bigint DEFAULT nextval('public.korisnik_id_seq'::regclass) NOT NULL,
    password character varying(255),
    username character varying(255),
    status_id bigint,
    registration_date date,
    subject character varying(255),
    last_login timestamp without time zone,
    first_name character varying(255),
    last_name character varying(255),
    profile_picture_url character varying(255),
    county_id bigint,
    city character varying(255),
    role_id bigint,
    email character varying(255),
    phone_number character varying(255),
    is_email_verified boolean,
    is_contact_visible boolean,
    private_user boolean
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 255 (class 1259 OID 18051)
-- Name: volontiranje_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.volontiranje_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.volontiranje_id_seq OWNER TO postgres;

--
-- TOC entry 256 (class 1259 OID 18052)
-- Name: volunteering; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.volunteering (
    volunteer_id bigint DEFAULT nextval('public.volontiranje_id_seq'::regclass) NOT NULL,
    applicant_id bigint,
    organization_id bigint,
    volunteer_type bigint,
    availability character varying(255),
    motivation character varying(255),
    applied_at timestamp without time zone,
    status_id bigint,
    experience character varying(255)
);


ALTER TABLE public.volunteering OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16769)
-- Name: vrsta_zivotinje_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.vrsta_zivotinje_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.vrsta_zivotinje_id OWNER TO postgres;

--
-- TOC entry 3569 (class 2604 OID 24594)
-- Name: business_profiles business_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.business_profiles ALTER COLUMN business_id SET DEFAULT nextval('public.business_profiles_business_id_seq'::regclass);


--
-- TOC entry 3833 (class 0 OID 17917)
-- Dependencies: 251
-- Data for Name: adoption_requests; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.adoption_requests (adoption_id, pet_ad_id, user_id, experience, environment, reason, created_at, ad_owner_id, is_evaluated, household_members, schedule, allergies, address, status_id, is_open) VALUES (28, 102, 73, 'Udomio sam već puno životinja', 'Kuća s dvorištem', NULL, '2026-07-30 08:51:51.346769', 72, false, 'Za sebe', 'Nisam zauzet', 'Ne postoje alergije.', 'Prilaz Fausta Vrančića 6, 42000 Varaždin', 62, true);
INSERT INTO public.adoption_requests (adoption_id, pet_ad_id, user_id, experience, environment, reason, created_at, ad_owner_id, is_evaluated, household_members, schedule, allergies, address, status_id, is_open) VALUES (25, 101, 3, '...', 'Kuća i dvorište', NULL, '2026-07-22 08:59:26.782582', 71, true, 'Za člana obitelji', 'Nisam zauzet', 'Nemam', 'Adresa', 70, true);
INSERT INTO public.adoption_requests (adoption_id, pet_ad_id, user_id, experience, environment, reason, created_at, ad_owner_id, is_evaluated, household_members, schedule, allergies, address, status_id, is_open) VALUES (26, 102, 3, 'Volim ljubimce', 'Kuća s ograđenim dvorištem', NULL, '2026-07-22 10:32:45.512988', 72, true, 'Za sebe', 'Nisam zauzet', 'Ne postoji', 'Pavlinska 2, 42000 Varaždin, Hrvatska', 70, true);
INSERT INTO public.adoption_requests (adoption_id, pet_ad_id, user_id, experience, environment, reason, created_at, ad_owner_id, is_evaluated, household_members, schedule, allergies, address, status_id, is_open) VALUES (27, 101, 73, 'Imao sam puno kućnih ljubimaca', 'Kuća s dvorištem', NULL, '2026-07-29 21:06:43.476003', 71, true, 'Za sebe', 'Nisam zauzet', 'Nemam', 'Prilaz Fausta Vrančića 6, Varaždin 42000', 70, true);


--
-- TOC entry 3843 (class 0 OID 24610)
-- Dependencies: 261
-- Data for Name: attribute_types; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.attribute_types (id, name) VALUES (1, 'user_status');
INSERT INTO public.attribute_types (id, name) VALUES (2, 'ad_status');
INSERT INTO public.attribute_types (id, name) VALUES (3, 'pet_status');
INSERT INTO public.attribute_types (id, name) VALUES (4, 'lost_found_status');
INSERT INTO public.attribute_types (id, name) VALUES (5, 'animal_type');
INSERT INTO public.attribute_types (id, name) VALUES (6, 'adoption_status');
INSERT INTO public.attribute_types (id, name) VALUES (7, 'volunteer_status');
INSERT INTO public.attribute_types (id, name) VALUES (8, 'business_type');
INSERT INTO public.attribute_types (id, name) VALUES (9, 'inquiry_type');
INSERT INTO public.attribute_types (id, name) VALUES (10, 'volunteer_type');
INSERT INTO public.attribute_types (id, name) VALUES (11, 'block_reason');


--
-- TOC entry 3825 (class 0 OID 17663)
-- Dependencies: 243
-- Data for Name: attributes; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.attributes (attribute_id, value, attribute_type, description) VALUES (11, 'Aktivan', 1, 'Korisnički račun je aktivan');
INSERT INTO public.attributes (attribute_id, value, attribute_type, description) VALUES (12, 'U provjeri', 1, 'Korisnički račun u provjeri');
INSERT INTO public.attributes (attribute_id, value, attribute_type, description) VALUES (13, 'Obustavljen', 1, 'Korisnički račun je obustavljen');
INSERT INTO public.attributes (attribute_id, value, attribute_type, description) VALUES (21, 'Aktivan', 2, 'Oglas je aktivan');
INSERT INTO public.attributes (attribute_id, value, attribute_type, description) VALUES (22, 'Blokiran', 2, 'Oglas je blokiran');
INSERT INTO public.attributes (attribute_id, value, attribute_type, description) VALUES (23, 'Uspješno rješeno', 2, 'Ljubimac je pronašao vlasnika');
INSERT INTO public.attributes (attribute_id, value, attribute_type, description) VALUES (31, 'Još luta', 3, 'Ljubimac još luta');
INSERT INTO public.attributes (attribute_id, value, attribute_type, description) VALUES (32, 'U mojoj prisutnosti', 3, 'Ljubimac je u prisutnosti oglasivača');
INSERT INTO public.attributes (attribute_id, value, attribute_type, description) VALUES (33, 'U skloništu', 3, 'Ljubimac je u skloništu');
INSERT INTO public.attributes (attribute_id, value, attribute_type, description) VALUES (42, 'Pronađen', 4, 'Pronađen ljubimac');
INSERT INTO public.attributes (attribute_id, value, attribute_type, description) VALUES (53, 'Ptica', 5, 'Vrsta životinje');
INSERT INTO public.attributes (attribute_id, value, attribute_type, description) VALUES (24, 'U provjeri', 2, 'Oglas je u provjeri');
INSERT INTO public.attributes (attribute_id, value, attribute_type, description) VALUES (43, 'Napušten', 4, 'Napušten ljubimac');
INSERT INTO public.attributes (attribute_id, value, attribute_type, description) VALUES (25, 'U procesu udomljavanja', 2, 'Oglas je u statusu udomljavanja');
INSERT INTO public.attributes (attribute_id, value, attribute_type, description) VALUES (61, 'Zahtjev zaprimljen', 6, 'Oglašivač je zaprimio zahtjev');
INSERT INTO public.attributes (attribute_id, value, attribute_type, description) VALUES (62, 'U razmatranju', 6, 'Oglašivač razmatra zahtjev');
INSERT INTO public.attributes (attribute_id, value, attribute_type, description) VALUES (63, 'Zahtjev odobren', 6, 'Oglašivač je odobrio zahtjev');
INSERT INTO public.attributes (attribute_id, value, attribute_type, description) VALUES (64, 'Zahtjev otkazan', 6, 'Podnositelj zahtjeva je otkazao zahtjev');
INSERT INTO public.attributes (attribute_id, value, attribute_type, description) VALUES (65, 'Zahtjev odbijen', 6, 'Oglašivač je odbio zahtjev');
INSERT INTO public.attributes (attribute_id, value, attribute_type, description) VALUES (91, 'Tehnička podrška', 9, 'Tip upita');
INSERT INTO public.attributes (attribute_id, value, attribute_type, description) VALUES (92, 'Pitanje o procesu udomljavanja', 9, 'Tip upita');
INSERT INTO public.attributes (attribute_id, value, attribute_type, description) VALUES (67, 'Udomljavanje odobreno', 6, 'Oglašivač odobrio udomljavanje');
INSERT INTO public.attributes (attribute_id, value, attribute_type, description) VALUES (93, 'Savjet o zdravlju ljubimca', 9, 'Tip upita');
INSERT INTO public.attributes (attribute_id, value, attribute_type, description) VALUES (66, 'Rezultat procjene u tijeku', 6, 'Rezultat procjene u tijeku');
INSERT INTO public.attributes (attribute_id, value, attribute_type, description) VALUES (94, 'Savjet o njezi ljubimca', 9, 'Tip upita');
INSERT INTO public.attributes (attribute_id, value, attribute_type, description) VALUES (102, 'Šetanje pasa', 10, 'Tip volontiranja');
INSERT INTO public.attributes (attribute_id, value, attribute_type, description) VALUES (69, 'Potpisivanje ugovora', 6, 'Sudionici potpisuju ugovor');
INSERT INTO public.attributes (attribute_id, value, attribute_type, description) VALUES (68, 'Udomljavanje odbijeno', 6, 'Oglašivač odbio udomljavanje');
INSERT INTO public.attributes (attribute_id, value, attribute_type, description) VALUES (70, 'Proces završen', 6, 'Proces uspješno završen');
INSERT INTO public.attributes (attribute_id, value, attribute_type, description) VALUES (41, 'Traži se', 4, 'Izgubljen ljubimac');
INSERT INTO public.attributes (attribute_id, value, attribute_type, description) VALUES (71, 'Prijava poslana', 7, 'Prijava za volontiranje poslana');
INSERT INTO public.attributes (attribute_id, value, attribute_type, description) VALUES (72, 'Prijava prihvaćena', 7, 'Prijava za volontiranje prihvaćena');
INSERT INTO public.attributes (attribute_id, value, attribute_type, description) VALUES (73, 'Prijava odbijena', 7, 'Prijava za volontiranje odbijena');
INSERT INTO public.attributes (attribute_id, value, attribute_type, description) VALUES (81, 'Veterinarska stanica', 8, 'Tip poslovnog subjekta');
INSERT INTO public.attributes (attribute_id, value, attribute_type, description) VALUES (82, 'Udruga/Azil za ljubimce', 8, 'Tip poslovnog subjekta');
INSERT INTO public.attributes (attribute_id, value, attribute_type, description) VALUES (83, 'Pet shopovi', 8, 'Tip poslovnog subjekta');
INSERT INTO public.attributes (attribute_id, value, attribute_type, description) VALUES (84, 'Saloni za njegu životinja', 8, 'Tip poslovnog subjekta');
INSERT INTO public.attributes (attribute_id, value, attribute_type, description) VALUES (85, 'Škole za trening i dresuru pasa', 8, 'Tip poslovnog subjekta');
INSERT INTO public.attributes (attribute_id, value, attribute_type, description) VALUES (103, 'Spašavanje ljubimaca', 10, 'Tip volontiranja');
INSERT INTO public.attributes (attribute_id, value, attribute_type, description) VALUES (111, 'Kršenja pravila platforme', 11, 'Razlog blokiranja oglasa');
INSERT INTO public.attributes (attribute_id, value, attribute_type, description) VALUES (112, 'Zabrinutost za dobrobit životinje', 11, 'Razlog blokiranja oglasa');
INSERT INTO public.attributes (attribute_id, value, attribute_type, description) VALUES (113, 'Sigurnosni problemi', 11, 'Razlog blokiranja oglasa');
INSERT INTO public.attributes (attribute_id, value, attribute_type, description) VALUES (114, 'Nekoliko prijava od strane korisnika', 11, 'Razlog blokiranja oglasa');
INSERT INTO public.attributes (attribute_id, value, attribute_type, description) VALUES (51, 'Pas', 5, 'Vrsta životinje - Pas');
INSERT INTO public.attributes (attribute_id, value, attribute_type, description) VALUES (52, 'Mačka', 5, 'Vrsta životinje - Mačka');
INSERT INTO public.attributes (attribute_id, value, attribute_type, description) VALUES (54, 'Ostalo', 5, 'Vrsta životinje - Ostalo');
INSERT INTO public.attributes (attribute_id, value, attribute_type, description) VALUES (101, 'Briga o ljubimcima', 10, 'Tip volontiranja');


--
-- TOC entry 3817 (class 0 OID 17207)
-- Dependencies: 235
-- Data for Name: breeds; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.breeds (breed_id, name, species_id) VALUES (1, 'Labrador retriver', 51);
INSERT INTO public.breeds (breed_id, name, species_id) VALUES (2, 'Golden retriver', 51);
INSERT INTO public.breeds (breed_id, name, species_id) VALUES (3, 'Njemački ovčar', 51);
INSERT INTO public.breeds (breed_id, name, species_id) VALUES (4, 'Francuski bulldog', 51);
INSERT INTO public.breeds (breed_id, name, species_id) VALUES (5, 'Aljaški haski', 51);
INSERT INTO public.breeds (breed_id, name, species_id) VALUES (6, 'Aljaški malamut', 51);
INSERT INTO public.breeds (breed_id, name, species_id) VALUES (7, 'Boxer', 51);
INSERT INTO public.breeds (breed_id, name, species_id) VALUES (8, 'Doberman', 51);
INSERT INTO public.breeds (breed_id, name, species_id) VALUES (9, 'Bigl', 51);
INSERT INTO public.breeds (breed_id, name, species_id) VALUES (10, 'Border collie', 51);
INSERT INTO public.breeds (breed_id, name, species_id) VALUES (11, 'Rottweiler', 51);
INSERT INTO public.breeds (breed_id, name, species_id) VALUES (12, 'Akita Inu', 51);
INSERT INTO public.breeds (breed_id, name, species_id) VALUES (13, 'Američki bulldog', 51);
INSERT INTO public.breeds (breed_id, name, species_id) VALUES (14, 'Američki bully', 51);
INSERT INTO public.breeds (breed_id, name, species_id) VALUES (40, 'Pitbull terijer', 51);
INSERT INTO public.breeds (breed_id, name, species_id) VALUES (15, 'Stafordski terijer', 51);
INSERT INTO public.breeds (breed_id, name, species_id) VALUES (16, 'Australski ovčar', 51);
INSERT INTO public.breeds (breed_id, name, species_id) VALUES (17, 'Bernardinac', 51);
INSERT INTO public.breeds (breed_id, name, species_id) VALUES (18, 'Belgijski ovčar', 51);
INSERT INTO public.breeds (breed_id, name, species_id) VALUES (19, 'Bernski planinski pas', 51);
INSERT INTO public.breeds (breed_id, name, species_id) VALUES (20, 'Dalmatinac', 51);
INSERT INTO public.breeds (breed_id, name, species_id) VALUES (21, 'Chihuahua', 51);
INSERT INTO public.breeds (breed_id, name, species_id) VALUES (22, 'Bengalska mačka', 52);
INSERT INTO public.breeds (breed_id, name, species_id) VALUES (23, 'Birmanska mačka', 52);
INSERT INTO public.breeds (breed_id, name, species_id) VALUES (24, 'Britanska dugodlaka mačka', 52);
INSERT INTO public.breeds (breed_id, name, species_id) VALUES (25, 'Britanska kratkodlaka mačka', 52);
INSERT INTO public.breeds (breed_id, name, species_id) VALUES (26, 'Europska kratkodlaka mačka', 52);
INSERT INTO public.breeds (breed_id, name, species_id) VALUES (27, 'Himalajska mačka', 52);
INSERT INTO public.breeds (breed_id, name, species_id) VALUES (28, 'Japanski bobtail', 52);
INSERT INTO public.breeds (breed_id, name, species_id) VALUES (29, 'Mačka bez dlake', 52);
INSERT INTO public.breeds (breed_id, name, species_id) VALUES (30, 'Maine Coon', 52);
INSERT INTO public.breeds (breed_id, name, species_id) VALUES (31, 'Perzijska mačka', 52);
INSERT INTO public.breeds (breed_id, name, species_id) VALUES (32, 'Papiga tigrica', 53);
INSERT INTO public.breeds (breed_id, name, species_id) VALUES (33, 'Papiga Nimfa', 53);
INSERT INTO public.breeds (breed_id, name, species_id) VALUES (34, 'Zebice', 53);
INSERT INTO public.breeds (breed_id, name, species_id) VALUES (35, 'Kanarinci', 53);
INSERT INTO public.breeds (breed_id, name, species_id) VALUES (36, 'Papiga Rozela', 53);
INSERT INTO public.breeds (breed_id, name, species_id) VALUES (37, 'Papiga Žako', 53);
INSERT INTO public.breeds (breed_id, name, species_id) VALUES (42, 'Nema', 54);
INSERT INTO public.breeds (breed_id, name, species_id) VALUES (38, 'Zamorac', 54);
INSERT INTO public.breeds (breed_id, name, species_id) VALUES (39, 'Hrčak', 54);
INSERT INTO public.breeds (breed_id, name, species_id) VALUES (41, 'Nema', 54);


--
-- TOC entry 3841 (class 0 OID 24578)
-- Dependencies: 259
-- Data for Name: business_profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.business_profiles (user_id, oib, website, business_type_id, business_id) VALUES (71, '85072986774', 'https://www.vetnoah.hr', 81, 4);
INSERT INTO public.business_profiles (user_id, oib, website, business_type_id, business_id) VALUES (72, '55548669267', 'https://sapica.com', 82, 5);


--
-- TOC entry 3807 (class 0 OID 16815)
-- Dependencies: 225
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.comments (comment_id, pet_ad_id, user_id, content, created_at) VALUES (65, 101, 71, 'boook', '2026-07-21 22:05:34.957726');
INSERT INTO public.comments (comment_id, pet_ad_id, user_id, content, created_at) VALUES (66, 101, 73, 'Jel još dostupan?', '2026-07-29 20:41:53.104948');
INSERT INTO public.comments (comment_id, pet_ad_id, user_id, content, created_at) VALUES (67, 105, 76, 'Jel još dostupan?', '2026-07-30 09:22:32.442704');


--
-- TOC entry 3835 (class 0 OID 18005)
-- Dependencies: 253
-- Data for Name: contracts; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.contracts (contract_id, adoption_id, file_name, uploaded_at, new_file_name, user_id, signed_status) VALUES (18, 25, 'Ugovor-o-udomljenju.pdf', '2026-07-22 09:02:44.639588', 'contract_25.pdf', 71, 2);
INSERT INTO public.contracts (contract_id, adoption_id, file_name, uploaded_at, new_file_name, user_id, signed_status) VALUES (19, 26, 'Ugovor-o-udomljenju.pdf', '2026-07-22 10:33:41.843121', 'contract_26.pdf', 72, 2);
INSERT INTO public.contracts (contract_id, adoption_id, file_name, uploaded_at, new_file_name, user_id, signed_status) VALUES (20, 27, 'Ugovor-o-udomljenju.pdf', '2026-07-29 21:08:26.363954', 'contract_27.pdf', 71, 2);


--
-- TOC entry 3813 (class 0 OID 16999)
-- Dependencies: 231
-- Data for Name: counties; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.counties (county_id, name) VALUES (1, 'Zagrebačka');
INSERT INTO public.counties (county_id, name) VALUES (2, 'Krapinsko-zagorska');
INSERT INTO public.counties (county_id, name) VALUES (3, 'Sisačko-moslavačka');
INSERT INTO public.counties (county_id, name) VALUES (4, 'Karlovačka');
INSERT INTO public.counties (county_id, name) VALUES (5, 'Varaždinska');
INSERT INTO public.counties (county_id, name) VALUES (6, 'Koprivničko-križevačka');
INSERT INTO public.counties (county_id, name) VALUES (7, 'Bjelovarsko-bilogorska');
INSERT INTO public.counties (county_id, name) VALUES (8, 'Primorsko-goranska');
INSERT INTO public.counties (county_id, name) VALUES (9, 'Ličko-senjska');
INSERT INTO public.counties (county_id, name) VALUES (10, 'Virovitičko-podravska');
INSERT INTO public.counties (county_id, name) VALUES (11, 'Požeško-slavonska');
INSERT INTO public.counties (county_id, name) VALUES (12, 'Brodsko-posavska');
INSERT INTO public.counties (county_id, name) VALUES (13, 'Zadarska');
INSERT INTO public.counties (county_id, name) VALUES (14, 'Osječko-baranjska');
INSERT INTO public.counties (county_id, name) VALUES (15, 'Šibensko-kninska');
INSERT INTO public.counties (county_id, name) VALUES (16, 'Vukovarsko-srijemska');
INSERT INTO public.counties (county_id, name) VALUES (17, 'Splitsko-dalmatinska');
INSERT INTO public.counties (county_id, name) VALUES (18, 'Istarska');
INSERT INTO public.counties (county_id, name) VALUES (19, 'Dubrovačko-neretvanska');
INSERT INTO public.counties (county_id, name) VALUES (20, 'Međimurska');
INSERT INTO public.counties (county_id, name) VALUES (21, 'Grad Zagreb');


--
-- TOC entry 3839 (class 0 OID 18105)
-- Dependencies: 257
-- Data for Name: inquiries; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.inquiries (inquiry_id, question, user_id, answer, responder_id, type, created_at, replied_at) VALUES (23, 'Kako se pravilno brinuti o ljubimcu?', 73, NULL, NULL, 94, '2026-07-29 22:49:35.22137', NULL);
INSERT INTO public.inquiries (inquiry_id, question, user_id, answer, responder_id, type, created_at, replied_at) VALUES (22, 'Kako ide proces udomljavanja?', 73, 'Na detaljima oglasa kliknite gumb "Želim udomiti", nakon čega ćete morati ispuniti obrazac i onda započinje udomljavanje putem aplikacije.', 72, 92, '2026-07-29 22:49:25.942595', '2026-07-29 22:55:50.913133');


--
-- TOC entry 3844 (class 0 OID 24654)
-- Dependencies: 262
-- Data for Name: pet_ad_contact; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.pet_ad_contact (contact_id, pet_ad_id, sender_id, receiver_id, subject, message, created_at, is_read, answer, replied_at) VALUES (5, 102, 3, 72, 'Jel dostupan', 'Pozdrav, jel pas dostupan', '2026-07-22 10:31:56.299998', false, NULL, NULL);
INSERT INTO public.pet_ad_contact (contact_id, pet_ad_id, sender_id, receiver_id, subject, message, created_at, is_read, answer, replied_at) VALUES (6, 101, 73, 71, 'Dostupnost ljubimca', 'Poštovani, jel ljubimac još dostupan kod Vas? Ako je, ja bih udomio', '2026-07-29 20:42:14.13793', true, 'Poštovani, dostupno je. Možete poslati preko aplikacije zahtjev za udomljavanje.', '2026-07-29 20:54:52.852408');
INSERT INTO public.pet_ad_contact (contact_id, pet_ad_id, sender_id, receiver_id, subject, message, created_at, is_read, answer, replied_at) VALUES (8, 102, 73, 72, 'Dostupnost ljubimca', 'Poštovani, jel još uvijek dostupan? Ja bih ga udomio.', '2026-07-30 08:51:15.074595', true, NULL, NULL);


--
-- TOC entry 3810 (class 0 OID 16836)
-- Dependencies: 228
-- Data for Name: pet_ad_history; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.pet_ad_history (history_id, pet_ad_id, changed_at, status_id, user_id, comment, rate, reason) VALUES (80, 101, '2026-07-29', 22, 71, NULL, NULL, 'Obustavljen korisnički račun');
INSERT INTO public.pet_ad_history (history_id, pet_ad_id, changed_at, status_id, user_id, comment, rate, reason) VALUES (81, 102, '2026-07-29', 22, 72, NULL, NULL, 'Obustavljen korisnički račun');
INSERT INTO public.pet_ad_history (history_id, pet_ad_id, changed_at, status_id, user_id, comment, rate, reason) VALUES (82, 102, '2026-07-30', 22, 72, NULL, NULL, 'Obustavljen korisnički račun');


--
-- TOC entry 3806 (class 0 OID 16803)
-- Dependencies: 224
-- Data for Name: pet_ad_pictures; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.pet_ad_pictures (picture_id, pet_ad_id, url, is_first) VALUES (150, 101, '101_1.webp', true);
INSERT INTO public.pet_ad_pictures (picture_id, pet_ad_id, url, is_first) VALUES (151, 101, '101_2.webp', false);
INSERT INTO public.pet_ad_pictures (picture_id, pet_ad_id, url, is_first) VALUES (152, 102, '102_1.webp', true);
INSERT INTO public.pet_ad_pictures (picture_id, pet_ad_id, url, is_first) VALUES (153, 102, '102_2.webp', false);
INSERT INTO public.pet_ad_pictures (picture_id, pet_ad_id, url, is_first) VALUES (154, 103, '103_1.png', true);
INSERT INTO public.pet_ad_pictures (picture_id, pet_ad_id, url, is_first) VALUES (155, 104, '104_1.png', true);
INSERT INTO public.pet_ad_pictures (picture_id, pet_ad_id, url, is_first) VALUES (156, 105, '105_1.webp', true);


--
-- TOC entry 3801 (class 0 OID 16743)
-- Dependencies: 219
-- Data for Name: pet_ads; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.pet_ads (pet_ad_id, notes, created_at, category_id, status_id, user_id, county_id, pet_id, naslov, views, city, reward, generated_name) VALUES (103, NULL, '2026-07-29', 41, 21, 71, 1, 75, NULL, 0, 'Zagreb', NULL, '103-41-12');
INSERT INTO public.pet_ads (pet_ad_id, notes, created_at, category_id, status_id, user_id, county_id, pet_id, naslov, views, city, reward, generated_name) VALUES (104, NULL, '2026-07-29', 42, 21, 71, 1, 76, NULL, 8, 'Zagreb', NULL, '104-42-12');
INSERT INTO public.pet_ads (pet_ad_id, notes, created_at, category_id, status_id, user_id, county_id, pet_id, naslov, views, city, reward, generated_name) VALUES (105, NULL, '2026-07-30', 42, 21, 73, 5, 77, NULL, 3, 'Varaždin', NULL, '105-42-524');
INSERT INTO public.pet_ads (pet_ad_id, notes, created_at, category_id, status_id, user_id, county_id, pet_id, naslov, views, city, reward, generated_name) VALUES (101, 'U skloništu, ostavljen pred veterinarskom stanicom', '2026-07-21', 43, 23, 71, 1, 73, NULL, 69, 'Zagreb', NULL, '101-43-12');
INSERT INTO public.pet_ads (pet_ad_id, notes, created_at, category_id, status_id, user_id, county_id, pet_id, naslov, views, city, reward, generated_name) VALUES (102, 'Nalazi se u skloništu', '2026-07-22', 43, 22, 72, 5, 74, NULL, 45, 'Varaždin', NULL, '102-43-53');


--
-- TOC entry 3816 (class 0 OID 17169)
-- Dependencies: 234
-- Data for Name: pets; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.pets (pet_id, missing_date, status_id, species_id, gender, maturity, breed_id, name, fur_color) VALUES (71, '2026-07-21', 32, 52, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.pets (pet_id, missing_date, status_id, species_id, gender, maturity, breed_id, name, fur_color) VALUES (62, '2026-07-12', 31, 52, 'M', 'M', 22, NULL, 'ddd');
INSERT INTO public.pets (pet_id, missing_date, status_id, species_id, gender, maturity, breed_id, name, fur_color) VALUES (72, '2026-07-21', 33, 51, 'M', 'O', 2, NULL, 'Zlatna');
INSERT INTO public.pets (pet_id, missing_date, status_id, species_id, gender, maturity, breed_id, name, fur_color) VALUES (73, '2026-07-20', 33, 51, 'M', 'O', 2, NULL, 'Zlatna');
INSERT INTO public.pets (pet_id, missing_date, status_id, species_id, gender, maturity, breed_id, name, fur_color) VALUES (74, '2026-07-22', 33, 51, 'M', 'O', 3, NULL, 'Crna i smeđa');
INSERT INTO public.pets (pet_id, missing_date, status_id, species_id, gender, maturity, breed_id, name, fur_color) VALUES (75, '2026-07-29', 31, 51, 'M', 'O', 2, NULL, 'Zlatna');
INSERT INTO public.pets (pet_id, missing_date, status_id, species_id, gender, maturity, breed_id, name, fur_color) VALUES (63, '2026-07-12', 31, 52, 'M', 'M', 22, NULL, 'aaaa');
INSERT INTO public.pets (pet_id, missing_date, status_id, species_id, gender, maturity, breed_id, name, fur_color) VALUES (76, '2026-07-29', 32, 51, 'M', 'O', 2, NULL, 'Zlatna');
INSERT INTO public.pets (pet_id, missing_date, status_id, species_id, gender, maturity, breed_id, name, fur_color) VALUES (64, '2026-07-12', 31, 52, 'M', 'M', 22, NULL, 'aaaaaaa');
INSERT INTO public.pets (pet_id, missing_date, status_id, species_id, gender, maturity, breed_id, name, fur_color) VALUES (65, '2026-07-13', 31, 53, 'Ž', 'M', 33, NULL, 'asdasd');
INSERT INTO public.pets (pet_id, missing_date, status_id, species_id, gender, maturity, breed_id, name, fur_color) VALUES (77, '2026-07-30', 32, 52, 'Ž', 'M', 24, NULL, 'Bijela');
INSERT INTO public.pets (pet_id, missing_date, status_id, species_id, gender, maturity, breed_id, name, fur_color) VALUES (78, '2026-07-30', 31, 52, 'Ž', 'M', 24, NULL, 'Bijela');
INSERT INTO public.pets (pet_id, missing_date, status_id, species_id, gender, maturity, breed_id, name, fur_color) VALUES (79, '2026-07-30', 31, 52, 'Ž', 'M', 24, NULL, 'Bijela');
INSERT INTO public.pets (pet_id, missing_date, status_id, species_id, gender, maturity, breed_id, name, fur_color) VALUES (80, '2026-07-30', 31, 52, 'Ž', 'M', 24, NULL, 'Bijela');
INSERT INTO public.pets (pet_id, missing_date, status_id, species_id, gender, maturity, breed_id, name, fur_color) VALUES (81, '2026-07-30', 31, 52, 'Ž', 'M', 24, NULL, 'Bijela');
INSERT INTO public.pets (pet_id, missing_date, status_id, species_id, gender, maturity, breed_id, name, fur_color) VALUES (82, '2026-07-30', 31, 52, 'Ž', 'M', 24, NULL, 'Bijela');
INSERT INTO public.pets (pet_id, missing_date, status_id, species_id, gender, maturity, breed_id, name, fur_color) VALUES (70, '2026-07-20', 31, 51, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.pets (pet_id, missing_date, status_id, species_id, gender, maturity, breed_id, name, fur_color) VALUES (69, '2026-07-15', 32, 52, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.pets (pet_id, missing_date, status_id, species_id, gender, maturity, breed_id, name, fur_color) VALUES (68, '2026-07-15', 33, 53, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.pets (pet_id, missing_date, status_id, species_id, gender, maturity, breed_id, name, fur_color) VALUES (67, '2026-07-14', 31, 53, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.pets (pet_id, missing_date, status_id, species_id, gender, maturity, breed_id, name, fur_color) VALUES (66, '2026-07-14', 31, 52, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.pets (pet_id, missing_date, status_id, species_id, gender, maturity, breed_id, name, fur_color) VALUES (54, '2026-07-01', 31, 52, 'M', 'M', 24, NULL, 'plava');
INSERT INTO public.pets (pet_id, missing_date, status_id, species_id, gender, maturity, breed_id, name, fur_color) VALUES (55, '2026-07-06', 31, 52, 'M', 'M', 23, NULL, 'bijela');
INSERT INTO public.pets (pet_id, missing_date, status_id, species_id, gender, maturity, breed_id, name, fur_color) VALUES (56, '2026-07-07', 32, 51, 'M', 'M', 13, NULL, 'Boja');
INSERT INTO public.pets (pet_id, missing_date, status_id, species_id, gender, maturity, breed_id, name, fur_color) VALUES (57, '2026-07-07', 31, 53, 'Ž', 'M', 36, NULL, 'Bijela');
INSERT INTO public.pets (pet_id, missing_date, status_id, species_id, gender, maturity, breed_id, name, fur_color) VALUES (58, '2026-07-07', 31, 51, 'M', 'M', 5, NULL, 'Bijela');
INSERT INTO public.pets (pet_id, missing_date, status_id, species_id, gender, maturity, breed_id, name, fur_color) VALUES (59, '2026-07-07', 31, 51, 'M', 'M', 6, NULL, 'Bijela');
INSERT INTO public.pets (pet_id, missing_date, status_id, species_id, gender, maturity, breed_id, name, fur_color) VALUES (60, '2026-07-12', 31, 52, 'M', 'M', 24, NULL, 'sss');
INSERT INTO public.pets (pet_id, missing_date, status_id, species_id, gender, maturity, breed_id, name, fur_color) VALUES (61, '2026-07-12', 31, 51, 'Ž', 'O', 5, NULL, 'ddd');


--
-- TOC entry 3831 (class 0 OID 17860)
-- Dependencies: 249
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.reviews (review_id, rate, comment, user_id) VALUES (4, 3, 'jdnjnwkjdnkwn d', NULL);
INSERT INTO public.reviews (review_id, rate, comment, user_id) VALUES (5, 5, 'wsSAAs', 3);
INSERT INTO public.reviews (review_id, rate, comment, user_id) VALUES (6, 2, NULL, 3);
INSERT INTO public.reviews (review_id, rate, comment, user_id) VALUES (7, NULL, NULL, 3);
INSERT INTO public.reviews (review_id, rate, comment, user_id) VALUES (8, 4, 'ssasas', 3);


--
-- TOC entry 3812 (class 0 OID 16889)
-- Dependencies: 230
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.roles (role_id, name) VALUES (1, 'Administrator');
INSERT INTO public.roles (role_id, name) VALUES (2, 'Korisnik');
INSERT INTO public.roles (role_id, name) VALUES (3, 'Nepotpuni profil');


--
-- TOC entry 3822 (class 0 OID 17399)
-- Dependencies: 240
-- Data for Name: user_history; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (324, 3, NULL, '2026-07-21 20:42:03.373963', 3, 'Vaš oglas ''83-42-323'' je blokiran zbog mogućeg kršenja pravila platforme, kao što su dezinformacije o ljubimcu, iskorištavanje oglasa, etička kršenja.', 1, 114, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (328, 71, 'Dodan komentar na oglasu ''101-43-12''', '2026-07-21 22:05:35.002543', 71, NULL, 3, 1, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (332, 72, 'Izvršena verifikacija e-maila', '2026-07-21 22:59:14.557828', 72, 'Uspješno ste verificirali svoju e-mail adresu. Sada možete dovršiti svoj profil u postavkama i kreirati oglase za izgubljene ili pronađene životinje, pregledavati oglase drugih korisnika i kontaktirati ih putem platforme.', 1, 10, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (337, 3, 'Udomljavanje odobreno', '2026-07-22 09:00:18.349136', 3, 'Oglašivač je odobrio udomljavanje. Nakon što oglašivač pripremi svu dokumentaciju, slijedi potpisivanje ugovora.', 1, 22, 101);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (341, 3, 'Zahtjev u razmatranju', '2026-07-22 10:33:14.694897', 3, 'Oglašivač je otvorio vaš zahtjev za udomljavanjem i trenutno ga razmatra. Molimo pričekajte daljnje obavijesti.', 1, 16, 102);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (347, 71, 'Obustavljen korisnički račun', '2026-07-29 14:35:27.398003', 3, 'Kršenja pravila platforme.', 3, 13, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (352, 73, 'Izvršena verifikacija e-maila', '2026-07-29 20:28:52.457942', 73, 'Uspješno ste verificirali svoju e-mail adresu. Sada možete dovršiti svoj profil u postavkama i kreirati oglase za izgubljene ili pronađene životinje, pregledavati oglase drugih korisnika i kontaktirati ih putem platforme.', 1, 10, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (360, 71, 'Zahtjev za udomljavanjem.', '2026-07-29 21:06:43.476263', 71, 'Zaprimili ste zahtjev za udomljavanjem za napuštenog ljubimca kojeg ste objavili. Oglas je stavljen u status ''U procesu udomljavanja'', a zahtjev možete vidjeti pod opcijom ''Zaprimljeni zahtjevi''.', 1, 15, 101);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (368, 72, 'Obustavljen korisnički račun', '2026-07-29 22:29:29.169896', 3, 'Sigurnosni problemi.', 3, 13, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (374, 72, 'Prijava za volontiranje.', '2026-07-30 08:52:12.225142', 72, 'Zaprimili ste prijavu za volontiranje. Sve prijave možete vidjeti u odjeljku ''Prijave za volontiranje''.', 0, 32, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (212, 3, 'Dodan komentar na oglasu ''83-42-323''', '2026-07-06 22:58:36.251041', 3, NULL, 3, 1, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (386, 76, 'Izvršena verifikacija e-maila', '2026-07-30 09:21:24.095055', 76, 'Uspješno ste verificirali svoju e-mail adresu. Sada možete dovršiti svoj profil u postavkama i kreirati oglase za izgubljene ili pronađene životinje, pregledavati oglase drugih korisnika i kontaktirati ih putem platforme.', 1, 10, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (388, 73, 'Dodan komentar na oglasu ''105-42-524''', '2026-07-30 09:22:32.460229', 76, 'Korisnik ''anaanic'' ostavio je komentar na Vašem oglasu ''105-42-524''', 1, 1, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (389, 73, 'Dodan komentar na oglasu ''105-42-524''', '2026-07-30 09:23:17.110092', 76, 'Korisnik ''anaanic'' ostavio je komentar na Vašem oglasu ''105-42-524''', 1, 1, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (404, 76, 'Dodan oglas ''108-41-524''', '2026-07-30 09:40:06.863604', 76, 'Vaš oglas ''108-41-524'' je uspješno objavljen!', 1, 3, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (233, 3, 'Dodan komentar na oglasu ''86-41-25''', '2026-07-09 17:38:06.514551', 3, NULL, 3, 1, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (211, 3, 'Dodan oglas ''83-42-323''', '2026-07-06 22:17:44.275325', 3, 'Vaš oglas ''83-42-323'' je uspješno objavljen!', 1, 3, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (213, 3, 'Dodan oglas ''84-42-313''', '2026-07-07 11:24:06.482418', 3, 'Vaš oglas ''84-42-313'' je uspješno objavljen!', 1, 3, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (214, 3, 'Dodan oglas ''85-41-336''', '2026-07-07 14:07:24.237254', 3, 'Vaš oglas ''85-41-336'' je uspješno objavljen!', 1, 3, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (215, 3, 'Dodan oglas ''86-41-25''', '2026-07-07 15:09:12.177866', 3, 'Vaš oglas ''86-41-25'' je uspješno objavljen!', 1, 3, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (216, 3, 'Dodan oglas ''87-41-26''', '2026-07-07 15:14:22.814573', 3, 'Vaš oglas ''87-41-26'' je uspješno objavljen!', 1, 3, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (234, 3, 'Dosegnuto 100 pregleda na oglasu ''84-42-313''', '2026-07-10 22:40:09.66019', NULL, 'Vaš oglas ''84-42-313'' je dosegao 100 pregleda!', 1, 2, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (235, 3, 'Dosegnuto 100 pregleda na oglasu ''85-41-336''', '2026-07-10 23:54:00.020211', NULL, 'Vaš oglas ''85-41-336'' je dosegao 100 pregleda!', 1, 2, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (325, 71, 'Registracija izvršena ''21.07.2026''', '2026-07-21 21:02:34.123099', 71, 'Uspješno ste se registrirali', 1, 9, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (361, 73, 'Zahtjev u razmatranju', '2026-07-29 21:07:11.727831', 73, 'Oglašivač je otvorio vaš zahtjev za udomljavanjem i trenutno ga razmatra. Molimo pričekajte daljnje obavijesti.', 1, 16, 101);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (329, 72, 'Registracija izvršena ''21.07.2026''', '2026-07-21 22:22:58.21778', 72, 'Uspješno ste se registrirali', 1, 9, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (333, 71, 'Zahtjev za udomljavanjem.', '2026-07-22 08:59:26.783397', 71, 'Zaprimili ste zahtjev za udomljavanjem za napuštenog ljubimca kojeg ste objavili. Oglas je stavljen u status ''U procesu udomljavanja'', a zahtjev možete vidjeti pod opcijom ''Zaprimljeni zahtjevi''.', 1, 15, 101);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (236, 3, 'Dodan oglas ''88-41-324''', '2026-07-12 13:29:13.967925', 3, 'Vaš oglas ''88-41-324'' je uspješno objavljen!', 1, 3, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (237, 3, 'Dodan oglas ''89-42-25''', '2026-07-12 13:34:09.025961', 3, 'Vaš oglas ''89-42-25'' je uspješno objavljen!', 1, 3, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (238, 3, 'Dodan oglas ''90-41-222''', '2026-07-12 13:34:37.442773', 3, 'Vaš oglas ''90-41-222'' je uspješno objavljen!', 1, 3, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (239, 3, 'Dodan oglas ''91-41-222''', '2026-07-12 13:54:03.798384', 3, 'Vaš oglas ''91-41-222'' je uspješno objavljen!', 1, 3, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (240, 3, 'Dodan oglas ''92-42-222''', '2026-07-12 13:54:50.552867', 3, 'Vaš oglas ''92-42-222'' je uspješno objavljen!', 1, 3, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (241, 3, NULL, '2026-07-12 15:14:18.795227', 3, 'Vaš oglas ''90-41-222'' je blokiran zbog mogućeg kršenja pravila platforme, kao što su neprikladan sadržaj, spam ili komercijalna upotreba.', 1, 5, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (370, 73, 'Pitanja i odgovori', '2026-07-29 22:55:50.913223', 73, 'Dobili ste odgovor na Vaš upit. Možete ga vidjeti pod opcijom Moji upiti na Pitanja i odgovori.', 1, 27, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (338, 3, 'Potpisivanje ugovora', '2026-07-22 09:02:44.720661', 3, 'Oglašivač je dodao ugovor za udomljavanje šapice, kojeg možete vidjeti na detaljima Vašeg zahtjeva za udomljavanje. Molimo potpišite ugovor kako bi završili proces. ', 1, 24, 101);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (342, 3, 'Zahtjev odobren', '2026-07-22 10:33:18.191783', 3, 'Vaš zahtjev za udomljavanjem je odobren. Sljedeći koraci uključuju daljnju provjeru i dogovore za završetak procesa. ', 1, 18, 102);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (345, 3, 'Potpisivanje ugovora', '2026-07-22 10:33:41.859764', 3, 'Oglašivač je dodao ugovor za udomljavanje šapice, kojeg možete vidjeti na detaljima Vašeg zahtjeva za udomljavanje. Molimo potpišite ugovor kako bi završili proces. ', 1, 24, 102);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (348, 71, 'Ponovno aktiviran račun.', '2026-07-29 14:52:01.970673', 3, 'Vaš korisnički račun je ponovno aktiviran.', 1, 14, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (259, 3, 'Dodan komentar na oglasu ''92-42-222''', '2026-07-12 22:43:35.236435', 3, NULL, 3, 1, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (353, 71, 'Dodan komentar na oglasu ''101-43-12''', '2026-07-29 20:41:53.162305', 73, 'Korisnik ''peroperic'' ostavio je komentar na Vašem oglasu ''101-43-12''', 1, 1, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (263, 3, 'Dodan komentar na oglasu ''92-42-222''', '2026-07-13 14:45:02.607581', 3, NULL, 3, 1, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (264, 3, 'Dodan komentar na oglasu ''87-41-26''', '2026-07-13 14:45:14.459479', 3, NULL, 3, 1, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (266, 3, 'Dodan oglas ''93-41-333''', '2026-07-13 15:46:15.190527', 3, 'Vaš oglas ''93-41-333'' je uspješno objavljen!', 1, 3, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (369, 72, 'Pitanja i odgovori', '2026-07-29 22:49:25.995052', 72, 'Postoje nova pitanja u aplikaciji na koja bi mogli dati odgovor', 1, 28, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (375, 72, 'Obustavljen korisnički račun', '2026-07-30 08:52:31.273283', 3, 'Kršenja pravila platforme.', 3, 13, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (390, 73, 'Dodan komentar na oglasu ''105-42-524''', '2026-07-30 09:30:32.074128', 76, 'Korisnik ''anaanic'' ostavio je komentar na Vašem oglasu ''105-42-524''', 1, 1, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (391, 73, 'Dodan komentar na oglasu ''105-42-524''', '2026-07-30 09:30:43.718861', 76, 'Korisnik ''anaanic'' ostavio je komentar na Vašem oglasu ''105-42-524''', 1, 1, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (400, 76, 'Dodan oglas ''107-41-524''', '2026-07-30 09:33:44.874792', 76, 'Vaš oglas ''107-41-524'' je uspješno objavljen!', 1, 3, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (407, 76, 'Dodan oglas ''109-41-524''', '2026-07-30 09:41:37.53925', 76, 'Vaš oglas ''109-41-524'' je uspješno objavljen!', 1, 3, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (326, 71, 'Izvršena verifikacija e-maila', '2026-07-21 21:02:47.832989', 71, 'Uspješno ste verificirali svoju e-mail adresu. Sada možete dovršiti svoj profil u postavkama i kreirati oglase za izgubljene ili pronađene životinje, pregledavati oglase drugih korisnika i kontaktirati ih putem platforme.', 1, 10, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (330, 72, 'Izvršena verifikacija e-maila', '2026-07-21 22:48:54.209355', 72, 'Uspješno ste verificirali svoju e-mail adresu. Sada možete dovršiti svoj profil u postavkama i kreirati oglase za izgubljene ili pronađene životinje, pregledavati oglase drugih korisnika i kontaktirati ih putem platforme.', 1, 10, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (334, 3, 'Zahtjev u razmatranju', '2026-07-22 09:00:07.843281', 3, 'Oglašivač je otvorio vaš zahtjev za udomljavanjem i trenutno ga razmatra. Molimo pričekajte daljnje obavijesti.', 1, 16, 101);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (269, 3, 'Dodan komentar na oglasu ''92-42-222''', '2026-07-13 20:31:39.967994', 3, NULL, 3, 1, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (270, 3, 'Dodan komentar na oglasu ''92-42-222''', '2026-07-13 20:31:42.79456', 3, NULL, 3, 1, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (350, 71, 'Dodan oglas ''104-42-12''', '2026-07-29 17:09:33.462433', 71, 'Vaš oglas ''104-42-12'' je uspješno objavljen!', 1, 3, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (271, 3, 'Dodan komentar na oglasu ''93-41-333''', '2026-07-13 21:15:48.127827', 3, NULL, 3, 1, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (336, 3, 'Rezultat procjene u tijeku', '2026-07-22 09:00:16.121543', 3, 'Vaš razgovor i procjena s oglašivačem je obavljen. Sada čekamo konačnu potvrdu o mogućnosti udomljavanja. Bit ćete obaviješteni čim dobijemo odgovor.', 1, 17, 101);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (274, 3, 'Dodan oglas ''94-41-222''', '2026-07-14 14:57:05.911405', 3, 'Vaš oglas ''94-41-222'' je uspješno objavljen!', 1, 3, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (275, 3, 'Dodan komentar na oglasu ''94-41-222''', '2026-07-15 08:41:30.206028', 3, NULL, 3, 1, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (339, 72, 'Dodan oglas ''102-43-53''', '2026-07-22 10:30:45.896115', 72, 'Vaš oglas ''102-43-53'' je uspješno objavljen!', 1, 3, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (343, 3, 'Rezultat procjene u tijeku', '2026-07-22 10:33:21.557096', 3, 'Vaš razgovor i procjena s oglašivačem je obavljen. Sada čekamo konačnu potvrdu o mogućnosti udomljavanja. Bit ćete obaviješteni čim dobijemo odgovor.', 1, 17, 102);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (344, 3, 'Udomljavanje odobreno', '2026-07-22 10:33:25.161315', 3, 'Oglašivač je odobrio udomljavanje. Nakon što oglašivač pripremi svu dokumentaciju, slijedi potpisivanje ugovora.', 1, 22, 102);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (349, 71, 'Dodan oglas ''103-41-12''', '2026-07-29 17:05:09.60695', 71, 'Vaš oglas ''103-41-12'' je uspješno objavljen!', 1, 3, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (280, 3, 'Dodan oglas ''95-42-636''', '2026-07-15 12:33:10.053816', 3, 'Vaš oglas ''95-42-636'' je uspješno objavljen!', 1, 3, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (281, 3, 'Dodan oglas ''96-43-236''', '2026-07-15 12:35:47.743207', 3, 'Vaš oglas ''96-43-236'' je uspješno objavljen!', 1, 3, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (282, 3, 'Dodan oglas ''97-43-223''', '2026-07-15 12:52:12.181416', 3, 'Vaš oglas ''97-43-223'' je uspješno objavljen!', 1, 3, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (283, 3, 'Dodan komentar na oglasu ''96-43-236''', '2026-07-15 18:17:58.78216', 3, NULL, 3, 1, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (284, 3, 'Dodan komentar na oglasu ''96-43-236''', '2026-07-15 18:18:17.701468', 3, NULL, 3, 1, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (285, 3, 'Dosegnuto 100 pregleda na oglasu ''88-41-324''', '2026-07-15 19:37:34.76865', NULL, 'Vaš oglas ''88-41-324'' je dosegao 100 pregleda!', 1, 2, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (287, 3, 'Dosegnuto 100 pregleda na oglasu ''92-42-222''', '2026-07-15 21:47:16.364811', NULL, 'Vaš oglas ''92-42-222'' je dosegao 100 pregleda!', 1, 2, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (363, 73, 'Rezultat procjene u tijeku', '2026-07-29 21:07:19.424275', 73, 'Vaš razgovor i procjena s oglašivačem je obavljen. Sada čekamo konačnu potvrdu o mogućnosti udomljavanja. Bit ćete obaviješteni čim dobijemo odgovor.', 1, 17, 101);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (364, 73, 'Udomljavanje odobreno', '2026-07-29 21:07:23.534928', 73, 'Oglašivač je odobrio udomljavanje. Nakon što oglašivač pripremi svu dokumentaciju, slijedi potpisivanje ugovora.', 1, 22, 101);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (371, 72, 'Ponovno aktiviran račun.', '2026-07-30 08:50:41.460869', 3, 'Vaš korisnički račun je ponovno aktiviran.', 0, 14, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (291, 3, 'Dosegnuto 100 pregleda na oglasu ''87-41-26''', '2026-07-15 23:38:34.621277', NULL, 'Vaš oglas ''87-41-26'' je dosegao 100 pregleda!', 1, 2, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (292, 3, 'Pitanja i odgovori', '2026-07-16 10:53:00.275168', 3, 'Dobili ste odgovor na Vaš upit. Možete ga vidjeti pod opcijom Moji upiti na Pitanja i odgovori.', 1, 27, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (293, 3, 'Pitanja i odgovori', '2026-07-19 14:30:27.090694', 3, 'Dobili ste odgovor na Vaš upit. Možete ga vidjeti pod opcijom Moji upiti na Pitanja i odgovori.', 1, 27, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (376, 73, 'Zahtjev u razmatranju', '2026-07-30 08:54:11.800843', 73, 'Oglašivač je otvorio vaš zahtjev za udomljavanjem i trenutno ga razmatra. Molimo pričekajte daljnje obavijesti.', 1, 16, 102);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (387, 73, 'Nova poruka', '2026-07-30 09:22:14.739393', 76, 'Korisnik ''peroperic'' Vam je poslao novu poruku vezanu uz oglas ''105-42-524''. Pregledajte ju u odjeljku ''Razgovori''.', 1, 30, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (297, 3, 'Pitanja i odgovori', '2026-07-19 15:30:26.497747', 3, 'Dobili ste odgovor na Vaš upit. Možete ga vidjeti pod opcijom Moji upiti na Pitanja i odgovori.', 1, 27, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (298, 3, NULL, '2026-07-19 18:03:57.053364', 3, 'Vaš oglas ''94-41-222'' je blokiran zbog nekoliko prijava od strane više korisnika', 1, 114, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (299, 3, 'Dodan komentar na oglasu ''96-43-236''', '2026-07-19 23:54:04.686074', 3, NULL, 3, 1, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (300, 3, 'Dodan komentar na oglasu ''97-43-223''', '2026-07-20 22:36:25.60335', 3, NULL, 3, 1, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (392, 73, 'Dodan komentar na oglasu ''105-42-524''', '2026-07-30 09:30:58.838118', 76, 'Korisnik ''anaanic'' ostavio je komentar na Vašem oglasu ''105-42-524''', 1, 1, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (410, 76, 'Dodan oglas ''110-41-524''', '2026-07-30 09:42:21.130302', 76, 'Vaš oglas ''110-41-524'' je uspješno objavljen!', 1, 3, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (301, 3, 'Dodan oglas ''98-41-212''', '2026-07-21 09:34:23.700794', 3, 'Vaš oglas ''98-41-212'' je uspješno objavljen!', 1, 3, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (373, 72, 'Zahtjev za udomljavanjem.', '2026-07-30 08:51:51.346968', 72, 'Zaprimili ste zahtjev za udomljavanjem za napuštenog ljubimca kojeg ste objavili. Oglas je stavljen u status ''U procesu udomljavanja'', a zahtjev možete vidjeti pod opcijom ''Zaprimljeni zahtjevi''.', 0, 15, 102);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (323, 3, NULL, '2026-07-21 19:46:03.066044', 3, 'Vaš oglas ''93-41-333'' je blokiran zbog mogućeg kršenja pravila platforme, kao što su neprikladan sadržaj, spam ili komercijalna upotreba.', 1, 114, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (327, 71, 'Dodan oglas ''101-43-12''', '2026-07-21 22:01:19.249702', 71, 'Vaš oglas ''101-43-12'' je uspješno objavljen!', 1, 3, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (331, 72, 'Izvršena verifikacija e-maila', '2026-07-21 22:49:12.066082', 72, 'Uspješno ste verificirali svoju e-mail adresu. Sada možete dovršiti svoj profil u postavkama i kreirati oglase za izgubljene ili pronađene životinje, pregledavati oglase drugih korisnika i kontaktirati ih putem platforme.', 1, 10, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (309, 3, 'Dodan oglas ''99-43-323''', '2026-07-21 13:12:27.8089', 3, 'Vaš oglas ''99-43-323'' je uspješno objavljen!', 1, 3, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (335, 3, 'Zahtjev odobren', '2026-07-22 09:00:13.968087', 3, 'Vaš zahtjev za udomljavanjem je odobren. Sljedeći koraci uključuju daljnju provjeru i dogovore za završetak procesa. ', 1, 18, 101);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (312, 3, NULL, '2026-07-21 13:50:49.696012', 3, 'Vaš oglas ''88-41-324'' je blokiran zbog mogućeg kršenja pravila platforme, kao što su dezinformacije o ljubimcu, iskorištavanje oglasa, etička kršenja.', 1, 114, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (340, 72, 'Zahtjev za udomljavanjem.', '2026-07-22 10:32:45.513229', 72, 'Zaprimili ste zahtjev za udomljavanjem za napuštenog ljubimca kojeg ste objavili. Oglas je stavljen u status ''U procesu udomljavanja'', a zahtjev možete vidjeti pod opcijom ''Zaprimljeni zahtjevi''.', 1, 15, 102);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (346, 3, 'Potpisivanje ugovora', '2026-07-22 10:45:00.466856', 3, 'Podnositelj zahtjeva je uspješno potpisao ugovor te Vam je ugovor vraćen radi Vašeg potpisa. Molimo da potpišete ugovor, nakon čega će proces udomljavanja bit završen.', 1, 29, 102);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (351, 73, 'Registracija izvršena ''29.07.2026''', '2026-07-29 20:28:02.661936', 73, 'Uspješno ste se registrirali', 1, 9, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (355, 71, 'Nova poruka', '2026-07-29 20:56:11.299715', 73, 'Korisnik ''VetNoah'' Vam je poslao novu poruku vezanu uz oglas ''101-43-12''. Pregledajte ju u odjeljku ''Razgovori''.', 1, 30, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (359, 73, 'Odgovor na poruku', '2026-07-29 21:05:21.997646', 71, 'Korisnik ''peroperic'' odgovorio je na Vašu poruku. Pregledajte ju u odjeljku ''Razgovori''.', 1, 31, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (366, 71, 'Potpisivanje ugovora', '2026-07-29 21:10:57.643225', 71, 'Podnositelj zahtjeva je uspješno potpisao ugovor te Vam je ugovor vraćen radi Vašeg potpisa. Molimo da potpišete ugovor, nakon čega će proces udomljavanja bit završen.', 1, 29, 101);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (362, 73, 'Zahtjev odobren', '2026-07-29 21:07:15.153086', 73, 'Vaš zahtjev za udomljavanjem je odobren. Sljedeći koraci uključuju daljnju provjeru i dogovore za završetak procesa. ', 1, 18, 101);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (365, 73, 'Potpisivanje ugovora', '2026-07-29 21:08:26.39732', 73, 'Oglašivač je dodao ugovor za udomljavanje šapice, kojeg možete vidjeti na detaljima Vašeg zahtjeva za udomljavanje. Molimo potpišite ugovor kako bi završili proces. ', 1, 24, 101);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (367, 73, 'Prijava za volontiranje.', '2026-07-29 22:11:30.186647', 73, 'Vaša prijava za volontiranje je odobrena. Sve svoje prijave i njihove statuse možete pregledati u odjeljku ''Prijave za volontiranje''.', 1, 33, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (372, 72, 'Nova poruka', '2026-07-30 08:51:15.101016', 73, 'Korisnik ''Šapica'' Vam je poslao novu poruku vezanu uz oglas ''102-43-53''. Pregledajte ju u odjeljku ''Razgovori''.', 0, 30, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (377, 72, NULL, '2026-07-30 08:56:36.73226', 72, 'Pronađena nova objava u Vašem mjestu! Provjerite detalje i pomozite u potrazi ili provjerite je li riječ o Vašem ljubimcu.', 0, 12, 105);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (385, 76, 'Registracija izvršena ''30.07.2026''', '2026-07-30 09:21:11.330041', 76, 'Uspješno ste se registrirali', 1, 9, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (378, 73, 'Dodan oglas ''105-42-524''', '2026-07-30 08:56:36.743129', 73, 'Vaš oglas ''105-42-524'' je uspješno objavljen!', 1, 3, NULL);
INSERT INTO public.user_history (history_id, user_id, content, created_at, created_by, notification, is_read, type, pet_ad_id) VALUES (396, 76, 'Dodan oglas ''106-41-524''', '2026-07-30 09:32:03.49318', 76, 'Vaš oglas ''106-41-524'' je uspješno objavljen!', 1, 3, NULL);


--
-- TOC entry 3829 (class 0 OID 17835)
-- Dependencies: 247
-- Data for Name: user_notification_preferences; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.user_notification_preferences (preference_id, user_id, type, receive_notification) VALUES (52, 71, 1, true);
INSERT INTO public.user_notification_preferences (preference_id, user_id, type, receive_notification) VALUES (53, 71, 11, true);
INSERT INTO public.user_notification_preferences (preference_id, user_id, type, receive_notification) VALUES (54, 71, 12, true);
INSERT INTO public.user_notification_preferences (preference_id, user_id, type, receive_notification) VALUES (55, 72, 1, true);
INSERT INTO public.user_notification_preferences (preference_id, user_id, type, receive_notification) VALUES (56, 72, 11, true);
INSERT INTO public.user_notification_preferences (preference_id, user_id, type, receive_notification) VALUES (57, 72, 12, true);
INSERT INTO public.user_notification_preferences (preference_id, user_id, type, receive_notification) VALUES (2, 3, 11, true);
INSERT INTO public.user_notification_preferences (preference_id, user_id, type, receive_notification) VALUES (3, 3, 12, true);
INSERT INTO public.user_notification_preferences (preference_id, user_id, type, receive_notification) VALUES (1, 3, 1, true);
INSERT INTO public.user_notification_preferences (preference_id, user_id, type, receive_notification) VALUES (67, 76, 1, true);
INSERT INTO public.user_notification_preferences (preference_id, user_id, type, receive_notification) VALUES (68, 76, 11, true);
INSERT INTO public.user_notification_preferences (preference_id, user_id, type, receive_notification) VALUES (69, 76, 12, true);
INSERT INTO public.user_notification_preferences (preference_id, user_id, type, receive_notification) VALUES (58, 73, 1, true);
INSERT INTO public.user_notification_preferences (preference_id, user_id, type, receive_notification) VALUES (70, 73, 2, false);
INSERT INTO public.user_notification_preferences (preference_id, user_id, type, receive_notification) VALUES (59, 73, 11, true);
INSERT INTO public.user_notification_preferences (preference_id, user_id, type, receive_notification) VALUES (60, 73, 12, false);
INSERT INTO public.user_notification_preferences (preference_id, user_id, type, receive_notification) VALUES (47, 3, NULL, true);
INSERT INTO public.user_notification_preferences (preference_id, user_id, type, receive_notification) VALUES (51, 3, 2, false);


--
-- TOC entry 3799 (class 0 OID 16722)
-- Dependencies: 217
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users (user_id, password, username, status_id, registration_date, subject, last_login, first_name, last_name, profile_picture_url, county_id, city, role_id, email, phone_number, is_email_verified, is_contact_visible, private_user) VALUES (3, '$2a$10$gqCtwxgjUC4OPJfbE1A5heUaMjpEnwnkksp2iUesgJB0YFgPoSrkS', 'helenatezak', 11, '2024-11-19', 'Fizička osoba', '2026-07-30 08:52:20.774684', 'Helena', 'Težak', 'user_3_1.jpeg', 4, 'Varaždin', 1, 'tezak.helena@gmail.com', '0998887777', true, false, true);
INSERT INTO public.users (user_id, password, username, status_id, registration_date, subject, last_login, first_name, last_name, profile_picture_url, county_id, city, role_id, email, phone_number, is_email_verified, is_contact_visible, private_user) VALUES (72, '$2a$10$g8G0JGN6KvbxWT7DVwjJ9OM6R5YV1xGLpeYVlPO6EUGE5mvKofvyi', 'Šapica', 13, '2026-07-21', NULL, '2026-07-30 08:52:38.732396', 'Šapica', NULL, 'user_72_1.jpg', 5, 'Varaždin', 2, 'xafohi9397@luckfeed.com', '098766544', true, true, false);
INSERT INTO public.users (user_id, password, username, status_id, registration_date, subject, last_login, first_name, last_name, profile_picture_url, county_id, city, role_id, email, phone_number, is_email_verified, is_contact_visible, private_user) VALUES (76, '$2a$10$9JZl1JALyZ2N6geaFQMMxeQXWUirkp7ULpQNOlp3EOptXJBwvujJK', 'anaanic', 11, '2026-07-30', NULL, '2026-07-30 09:21:30.448289', 'Ana', 'Anić', 'user_76_1.jpg', 4, 'Karlovac', 2, 'sewofet820@apdtax.com', '0956723456', true, true, true);
INSERT INTO public.users (user_id, password, username, status_id, registration_date, subject, last_login, first_name, last_name, profile_picture_url, county_id, city, role_id, email, phone_number, is_email_verified, is_contact_visible, private_user) VALUES (73, '$2a$10$06NtYDBRM9xblggUK9rKPuRo1ep0hvrBr0xCHr7K7DH9zHtC/HwEa', 'peroperic', 11, '2026-07-29', NULL, '2026-07-30 09:22:45.626727', 'Pero', 'Perić', 'user_73_1.avif', 5, 'Varaždin', 2, 'kemoham563@jobraux.com', '0997651234', true, true, true);
INSERT INTO public.users (user_id, password, username, status_id, registration_date, subject, last_login, first_name, last_name, profile_picture_url, county_id, city, role_id, email, phone_number, is_email_verified, is_contact_visible, private_user) VALUES (71, '$2a$10$mX4ReaqqZ33sDjB//4yYPuBsS6KayCK/8Q85E7uQEKMirY8Jp6F1K', 'VetNoah', 11, '2026-07-21', NULL, '2026-07-29 22:49:50.812795', 'VetNoah', NULL, 'user_71_1.jpg', 1, 'Zagreb', 2, 'xelaso4173@gicont.com', '0987654321', true, false, false);


--
-- TOC entry 3838 (class 0 OID 18052)
-- Dependencies: 256
-- Data for Name: volunteering; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.volunteering (volunteer_id, applicant_id, organization_id, volunteer_type, availability, motivation, applied_at, status_id, experience) VALUES (11, 73, 72, 101, 'Radnim danima poslije 16h i vikendom', 'Želim pomoći napuštenim životinjama', '2026-07-29 21:51:35.07987', 72, 'Već sam volontirao po dosta azila');
INSERT INTO public.volunteering (volunteer_id, applicant_id, organization_id, volunteer_type, availability, motivation, applied_at, status_id, experience) VALUES (12, 73, 72, 102, 'Radnim danima poslije 16h i vikendom', 'Jer volim pomagati', '2026-07-30 08:52:12.201974', 71, 'Već sam volontirao u azilima');


--
-- TOC entry 3853 (class 0 OID 0)
-- Dependencies: 252
-- Name: adoption_req_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.adoption_req_seq', 28, true);


--
-- TOC entry 3854 (class 0 OID 0)
-- Dependencies: 229
-- Name: blokirani_oglasi_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.blokirani_oglasi_id_seq', 82, true);


--
-- TOC entry 3855 (class 0 OID 0)
-- Dependencies: 260
-- Name: business_profiles_business_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.business_profiles_business_id_seq', 5, true);


--
-- TOC entry 3856 (class 0 OID 0)
-- Dependencies: 263
-- Name: contact_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.contact_id_seq', 9, true);


--
-- TOC entry 3857 (class 0 OID 0)
-- Dependencies: 221
-- Name: kategorije_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.kategorije_id_seq', 1, false);


--
-- TOC entry 3858 (class 0 OID 0)
-- Dependencies: 227
-- Name: komentari_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.komentari_id_seq', 71, true);


--
-- TOC entry 3859 (class 0 OID 0)
-- Dependencies: 241
-- Name: kontakt_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.kontakt_id', 84, true);


--
-- TOC entry 3860 (class 0 OID 0)
-- Dependencies: 218
-- Name: korisnik_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.korisnik_id_seq', 76, true);


--
-- TOC entry 3861 (class 0 OID 0)
-- Dependencies: 239
-- Name: korisnik_povijest_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.korisnik_povijest_id', 410, true);


--
-- TOC entry 3862 (class 0 OID 0)
-- Dependencies: 233
-- Name: korisnik_prava_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.korisnik_prava_id', 37, true);


--
-- TOC entry 3863 (class 0 OID 0)
-- Dependencies: 237
-- Name: ljubimac_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ljubimac_id_seq', 82, true);


--
-- TOC entry 3864 (class 0 OID 0)
-- Dependencies: 238
-- Name: notifikacija_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.notifikacija_id_seq', 9, true);


--
-- TOC entry 3865 (class 0 OID 0)
-- Dependencies: 220
-- Name: oglas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.oglas_id_seq', 110, true);


--
-- TOC entry 3866 (class 0 OID 0)
-- Dependencies: 232
-- Name: oglas_lokacija_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.oglas_lokacija_id', 1, false);


--
-- TOC entry 3867 (class 0 OID 0)
-- Dependencies: 226
-- Name: oglas_slike_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.oglas_slike_id', 161, true);


--
-- TOC entry 3868 (class 0 OID 0)
-- Dependencies: 236
-- Name: pasmina_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pasmina_id_seq', 1, true);


--
-- TOC entry 3869 (class 0 OID 0)
-- Dependencies: 245
-- Name: poruka_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.poruka_id_seq', 82, true);


--
-- TOC entry 3870 (class 0 OID 0)
-- Dependencies: 248
-- Name: preference_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.preference_id_seq', 70, true);


--
-- TOC entry 3871 (class 0 OID 0)
-- Dependencies: 242
-- Name: profil_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.profil_id_seq', 1, true);


--
-- TOC entry 3872 (class 0 OID 0)
-- Dependencies: 246
-- Name: razgovor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.razgovor_id_seq', 31, true);


--
-- TOC entry 3873 (class 0 OID 0)
-- Dependencies: 250
-- Name: recenzija_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.recenzija_id_seq', 8, true);


--
-- TOC entry 3874 (class 0 OID 0)
-- Dependencies: 223
-- Name: statusi_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.statusi_id', 9, true);


--
-- TOC entry 3875 (class 0 OID 0)
-- Dependencies: 254
-- Name: ugovor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ugovor_id_seq', 20, true);


--
-- TOC entry 3876 (class 0 OID 0)
-- Dependencies: 258
-- Name: upit_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.upit_id_seq', 23, true);


--
-- TOC entry 3877 (class 0 OID 0)
-- Dependencies: 255
-- Name: volontiranje_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.volontiranje_id_seq', 12, true);


--
-- TOC entry 3878 (class 0 OID 0)
-- Dependencies: 244
-- Name: vrijednost_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.vrijednost_id_seq', 17, true);


--
-- TOC entry 3879 (class 0 OID 0)
-- Dependencies: 222
-- Name: vrsta_zivotinje_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.vrsta_zivotinje_id', 1, true);


--
-- TOC entry 3598 (class 2606 OID 17923)
-- Name: adoption_requests adoption_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.adoption_requests
    ADD CONSTRAINT adoption_pk PRIMARY KEY (adoption_id);


--
-- TOC entry 3592 (class 2606 OID 17669)
-- Name: attributes attribute_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attributes
    ADD CONSTRAINT attribute_pk PRIMARY KEY (attribute_id);


--
-- TOC entry 3610 (class 2606 OID 24621)
-- Name: attribute_types attribute_types_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attribute_types
    ADD CONSTRAINT attribute_types_pkey PRIMARY KEY (id);


--
-- TOC entry 3580 (class 2606 OID 16842)
-- Name: pet_ad_history blokirani_oglasi_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pet_ad_history
    ADD CONSTRAINT blokirani_oglasi_pk PRIMARY KEY (history_id);


--
-- TOC entry 3588 (class 2606 OID 17213)
-- Name: breeds breed_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.breeds
    ADD CONSTRAINT breed_pk PRIMARY KEY (breed_id);


--
-- TOC entry 3606 (class 2606 OID 24596)
-- Name: business_profiles business_profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.business_profiles
    ADD CONSTRAINT business_profiles_pkey PRIMARY KEY (business_id);


--
-- TOC entry 3600 (class 2606 OID 18011)
-- Name: contracts contracts_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contracts
    ADD CONSTRAINT contracts_pk PRIMARY KEY (contract_id);


--
-- TOC entry 3584 (class 2606 OID 17005)
-- Name: counties county_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.counties
    ADD CONSTRAINT county_pk PRIMARY KEY (county_id);


--
-- TOC entry 3604 (class 2606 OID 18109)
-- Name: inquiries inquiry_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inquiries
    ADD CONSTRAINT inquiry_pk PRIMARY KEY (inquiry_id);


--
-- TOC entry 3578 (class 2606 OID 16821)
-- Name: comments komentari_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT komentari_pk PRIMARY KEY (comment_id);


--
-- TOC entry 3572 (class 2606 OID 16728)
-- Name: users korisnici_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT korisnici_pk PRIMARY KEY (user_id);


--
-- TOC entry 3590 (class 2606 OID 17404)
-- Name: user_history korisnik_povijest_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_history
    ADD CONSTRAINT korisnik_povijest_pk PRIMARY KEY (history_id);


--
-- TOC entry 3576 (class 2606 OID 16809)
-- Name: pet_ad_pictures oglas_slike_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pet_ad_pictures
    ADD CONSTRAINT oglas_slike_pk PRIMARY KEY (picture_id);


--
-- TOC entry 3574 (class 2606 OID 16749)
-- Name: pet_ads oglasi_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pet_ads
    ADD CONSTRAINT oglasi_pk PRIMARY KEY (pet_ad_id);


--
-- TOC entry 3612 (class 2606 OID 25363)
-- Name: pet_ad_contact pet_ad_contact_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pet_ad_contact
    ADD CONSTRAINT pet_ad_contact_pkey PRIMARY KEY (contact_id);


--
-- TOC entry 3586 (class 2606 OID 17175)
-- Name: pets pet_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pets
    ADD CONSTRAINT pet_pk PRIMARY KEY (pet_id);


--
-- TOC entry 3596 (class 2606 OID 17866)
-- Name: reviews recenzije_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT recenzije_pk PRIMARY KEY (review_id);


--
-- TOC entry 3608 (class 2606 OID 24607)
-- Name: business_profiles uk_user_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.business_profiles
    ADD CONSTRAINT uk_user_id UNIQUE (user_id);


--
-- TOC entry 3582 (class 2606 OID 16895)
-- Name: roles uloga_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT uloga_pk PRIMARY KEY (role_id);


--
-- TOC entry 3594 (class 2606 OID 17839)
-- Name: user_notification_preferences user_notification_preferences_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_notification_preferences
    ADD CONSTRAINT user_notification_preferences_pk PRIMARY KEY (preference_id);


--
-- TOC entry 3602 (class 2606 OID 18059)
-- Name: volunteering volontiranje_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.volunteering
    ADD CONSTRAINT volontiranje_pk PRIMARY KEY (volunteer_id);


--
-- TOC entry 3637 (class 2606 OID 17965)
-- Name: adoption_requests adoption_requests_korisnici_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.adoption_requests
    ADD CONSTRAINT adoption_requests_korisnici_fk FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- TOC entry 3638 (class 2606 OID 17955)
-- Name: adoption_requests adoption_requests_korisnici_fk_oglas; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.adoption_requests
    ADD CONSTRAINT adoption_requests_korisnici_fk_oglas FOREIGN KEY (ad_owner_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- TOC entry 3639 (class 2606 OID 17960)
-- Name: adoption_requests adoption_requests_oglasi_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.adoption_requests
    ADD CONSTRAINT adoption_requests_oglasi_fk FOREIGN KEY (pet_ad_id) REFERENCES public.pet_ads(pet_ad_id) ON DELETE CASCADE;


--
-- TOC entry 3640 (class 2606 OID 18000)
-- Name: adoption_requests adoption_requests_vrijednosti_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.adoption_requests
    ADD CONSTRAINT adoption_requests_vrijednosti_fk FOREIGN KEY (status_id) REFERENCES public.attributes(attribute_id);


--
-- TOC entry 3624 (class 2606 OID 17316)
-- Name: pet_ad_history blokirani_oglasi_oglasi_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pet_ad_history
    ADD CONSTRAINT blokirani_oglasi_oglasi_fk FOREIGN KEY (pet_ad_id) REFERENCES public.pet_ads(pet_ad_id) ON DELETE CASCADE;


--
-- TOC entry 3630 (class 2606 OID 17753)
-- Name: breeds breed_attribute_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.breeds
    ADD CONSTRAINT breed_attribute_fk FOREIGN KEY (species_id) REFERENCES public.attributes(attribute_id);


--
-- TOC entry 3649 (class 2606 OID 24697)
-- Name: business_profiles business_profiles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.business_profiles
    ADD CONSTRAINT business_profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- TOC entry 3641 (class 2606 OID 24717)
-- Name: contracts contracts_adoption_requests_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contracts
    ADD CONSTRAINT contracts_adoption_requests_fk FOREIGN KEY (adoption_id) REFERENCES public.adoption_requests(adoption_id) ON DELETE CASCADE;


--
-- TOC entry 3642 (class 2606 OID 18038)
-- Name: contracts contracts_korisnici_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contracts
    ADD CONSTRAINT contracts_korisnici_fk FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- TOC entry 3650 (class 2606 OID 24588)
-- Name: business_profiles fk_attribute; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.business_profiles
    ADD CONSTRAINT fk_attribute FOREIGN KEY (business_type_id) REFERENCES public.attributes(attribute_id);


--
-- TOC entry 3634 (class 2606 OID 24622)
-- Name: attributes fk_attribute_type; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attributes
    ADD CONSTRAINT fk_attribute_type FOREIGN KEY (attribute_type) REFERENCES public.attribute_types(id);


--
-- TOC entry 3643 (class 2606 OID 24642)
-- Name: volunteering fk_volunteer_type; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.volunteering
    ADD CONSTRAINT fk_volunteer_type FOREIGN KEY (volunteer_type) REFERENCES public.attributes(attribute_id);


--
-- TOC entry 3647 (class 2606 OID 18112)
-- Name: inquiries inquiry_user_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inquiries
    ADD CONSTRAINT inquiry_user_fk FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- TOC entry 3648 (class 2606 OID 18117)
-- Name: inquiries inquiry_user_fk_1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inquiries
    ADD CONSTRAINT inquiry_user_fk_1 FOREIGN KEY (responder_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- TOC entry 3622 (class 2606 OID 17481)
-- Name: comments komentari_korisnici_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT komentari_korisnici_fk FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- TOC entry 3623 (class 2606 OID 17486)
-- Name: comments komentari_oglasi_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT komentari_oglasi_fk FOREIGN KEY (pet_ad_id) REFERENCES public.pet_ads(pet_ad_id) ON DELETE CASCADE;


--
-- TOC entry 3613 (class 2606 OID 17588)
-- Name: users korisnici_uloga_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT korisnici_uloga_fk FOREIGN KEY (role_id) REFERENCES public.roles(role_id);


--
-- TOC entry 3614 (class 2606 OID 17708)
-- Name: users korisnici_vrijednosti_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT korisnici_vrijednosti_fk FOREIGN KEY (status_id) REFERENCES public.attributes(attribute_id);


--
-- TOC entry 3615 (class 2606 OID 17583)
-- Name: users korisnici_zupanija_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT korisnici_zupanija_fk FOREIGN KEY (county_id) REFERENCES public.counties(county_id);


--
-- TOC entry 3631 (class 2606 OID 17407)
-- Name: user_history korisnik_povijest_korisnici_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_history
    ADD CONSTRAINT korisnik_povijest_korisnici_fk FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- TOC entry 3632 (class 2606 OID 17578)
-- Name: user_history korisnik_povijest_korisnici_fk2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_history
    ADD CONSTRAINT korisnik_povijest_korisnici_fk2 FOREIGN KEY (created_by) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- TOC entry 3633 (class 2606 OID 17658)
-- Name: user_history korisnik_povijest_oglasi_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_history
    ADD CONSTRAINT korisnik_povijest_oglasi_fk FOREIGN KEY (pet_ad_id) REFERENCES public.pet_ads(pet_ad_id) ON DELETE CASCADE;


--
-- TOC entry 3621 (class 2606 OID 17321)
-- Name: pet_ad_pictures oglas_slike_oglasi_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pet_ad_pictures
    ADD CONSTRAINT oglas_slike_oglasi_fk FOREIGN KEY (pet_ad_id) REFERENCES public.pet_ads(pet_ad_id) ON DELETE CASCADE;


--
-- TOC entry 3616 (class 2606 OID 17548)
-- Name: pet_ads oglasi_korisnici_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pet_ads
    ADD CONSTRAINT oglasi_korisnici_fk FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- TOC entry 3617 (class 2606 OID 17311)
-- Name: pet_ads oglasi_ljubimac_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pet_ads
    ADD CONSTRAINT oglasi_ljubimac_fk FOREIGN KEY (pet_id) REFERENCES public.pets(pet_id) ON DELETE CASCADE;


--
-- TOC entry 3618 (class 2606 OID 17718)
-- Name: pet_ads oglasi_vrijednosti_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pet_ads
    ADD CONSTRAINT oglasi_vrijednosti_fk FOREIGN KEY (status_id) REFERENCES public.attributes(attribute_id);


--
-- TOC entry 3619 (class 2606 OID 17738)
-- Name: pet_ads oglasi_vrijednosti_kategorija_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pet_ads
    ADD CONSTRAINT oglasi_vrijednosti_kategorija_fk FOREIGN KEY (category_id) REFERENCES public.attributes(attribute_id);


--
-- TOC entry 3620 (class 2606 OID 17553)
-- Name: pet_ads oglasi_zupanija_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pet_ads
    ADD CONSTRAINT oglasi_zupanija_fk FOREIGN KEY (county_id) REFERENCES public.counties(county_id) ON DELETE CASCADE;


--
-- TOC entry 3651 (class 2606 OID 24659)
-- Name: pet_ad_contact pet_ad_contact_pet_ads_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pet_ad_contact
    ADD CONSTRAINT pet_ad_contact_pet_ads_fk FOREIGN KEY (pet_ad_id) REFERENCES public.pet_ads(pet_ad_id);


--
-- TOC entry 3652 (class 2606 OID 24707)
-- Name: pet_ad_contact pet_ad_contact_users_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pet_ad_contact
    ADD CONSTRAINT pet_ad_contact_users_fk FOREIGN KEY (sender_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- TOC entry 3653 (class 2606 OID 24712)
-- Name: pet_ad_contact pet_ad_contact_users_fk_1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pet_ad_contact
    ADD CONSTRAINT pet_ad_contact_users_fk_1 FOREIGN KEY (receiver_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- TOC entry 3627 (class 2606 OID 17723)
-- Name: pets pet_attribute_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pets
    ADD CONSTRAINT pet_attribute_fk FOREIGN KEY (status_id) REFERENCES public.attributes(attribute_id);


--
-- TOC entry 3628 (class 2606 OID 17733)
-- Name: pets pet_attribute_vrsta_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pets
    ADD CONSTRAINT pet_attribute_vrsta_fk FOREIGN KEY (species_id) REFERENCES public.attributes(attribute_id);


--
-- TOC entry 3629 (class 2606 OID 17232)
-- Name: pets pet_breed_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pets
    ADD CONSTRAINT pet_breed_fk FOREIGN KEY (breed_id) REFERENCES public.breeds(breed_id);


--
-- TOC entry 3625 (class 2606 OID 17568)
-- Name: pet_ad_history povijest_oglasa_korisnici_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pet_ad_history
    ADD CONSTRAINT povijest_oglasa_korisnici_fk FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- TOC entry 3626 (class 2606 OID 17728)
-- Name: pet_ad_history povijest_oglasa_vrijednosti_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pet_ad_history
    ADD CONSTRAINT povijest_oglasa_vrijednosti_fk FOREIGN KEY (status_id) REFERENCES public.attributes(attribute_id);


--
-- TOC entry 3636 (class 2606 OID 24702)
-- Name: reviews reviews_users_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_users_fk FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- TOC entry 3635 (class 2606 OID 17840)
-- Name: user_notification_preferences user_notification_preferences_korisnici_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_notification_preferences
    ADD CONSTRAINT user_notification_preferences_korisnici_fk FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3644 (class 2606 OID 18060)
-- Name: volunteering volontiranje_korisnici_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.volunteering
    ADD CONSTRAINT volontiranje_korisnici_fk FOREIGN KEY (applicant_id) REFERENCES public.users(user_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3645 (class 2606 OID 18065)
-- Name: volunteering volontiranje_korisnici_fk1_1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.volunteering
    ADD CONSTRAINT volontiranje_korisnici_fk1_1 FOREIGN KEY (organization_id) REFERENCES public.users(user_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3646 (class 2606 OID 18093)
-- Name: volunteering volunteer_status_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.volunteering
    ADD CONSTRAINT volunteer_status_fk FOREIGN KEY (status_id) REFERENCES public.attributes(attribute_id);


-- Completed on 2026-07-30 09:46:20 CEST

--
-- PostgreSQL database dump complete
--

