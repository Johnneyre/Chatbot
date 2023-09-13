PGDMP                         {            chatbot    15.3    15.3 *    %           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            &           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            '           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            (           1262    16725    chatbot    DATABASE     z   CREATE DATABASE chatbot WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Spain.1252';
    DROP DATABASE chatbot;
                postgres    false            �            1259    16727 	   accesorio    TABLE     j   CREATE TABLE public.accesorio (
    id_accesorio integer NOT NULL,
    accesorio character varying(40)
);
    DROP TABLE public.accesorio;
       public         heap    postgres    false            �            1259    16726    accesorio_id_accesorio_seq    SEQUENCE     �   CREATE SEQUENCE public.accesorio_id_accesorio_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.accesorio_id_accesorio_seq;
       public          postgres    false    215            )           0    0    accesorio_id_accesorio_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.accesorio_id_accesorio_seq OWNED BY public.accesorio.id_accesorio;
          public          postgres    false    214            �            1259    16748 
   cilindraje    TABLE     m   CREATE TABLE public.cilindraje (
    id_cilindraje integer NOT NULL,
    cilindraje character varying(40)
);
    DROP TABLE public.cilindraje;
       public         heap    postgres    false            �            1259    16747    cilindraje_id_cilindraje_seq    SEQUENCE     �   CREATE SEQUENCE public.cilindraje_id_cilindraje_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.cilindraje_id_cilindraje_seq;
       public          postgres    false    221            *           0    0    cilindraje_id_cilindraje_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.cilindraje_id_cilindraje_seq OWNED BY public.cilindraje.id_cilindraje;
          public          postgres    false    220            �            1259    16734    marcas    TABLE     a   CREATE TABLE public.marcas (
    id_marcas integer NOT NULL,
    marcas character varying(40)
);
    DROP TABLE public.marcas;
       public         heap    postgres    false            �            1259    16733    marcas_id_marcas_seq    SEQUENCE     �   CREATE SEQUENCE public.marcas_id_marcas_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.marcas_id_marcas_seq;
       public          postgres    false    217            +           0    0    marcas_id_marcas_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.marcas_id_marcas_seq OWNED BY public.marcas.id_marcas;
          public          postgres    false    216            �            1259    16741    modelo    TABLE     a   CREATE TABLE public.modelo (
    id_modelo integer NOT NULL,
    modelo character varying(40)
);
    DROP TABLE public.modelo;
       public         heap    postgres    false            �            1259    16740    modelo_id_modelo_seq    SEQUENCE     �   CREATE SEQUENCE public.modelo_id_modelo_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.modelo_id_modelo_seq;
       public          postgres    false    219            ,           0    0    modelo_id_modelo_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.modelo_id_modelo_seq OWNED BY public.modelo.id_modelo;
          public          postgres    false    218            �            1259    16755 	   repuestos    TABLE     �   CREATE TABLE public.repuestos (
    id_repuestos integer NOT NULL,
    repuestos character varying(50) NOT NULL,
    id_marcas integer,
    id_modelo integer,
    id_cilindraje integer,
    cantidad integer NOT NULL,
    precio integer
);
    DROP TABLE public.repuestos;
       public         heap    postgres    false            �            1259    16754    repuestos_id_repuestos_seq    SEQUENCE     �   CREATE SEQUENCE public.repuestos_id_repuestos_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.repuestos_id_repuestos_seq;
       public          postgres    false    223            -           0    0    repuestos_id_repuestos_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.repuestos_id_repuestos_seq OWNED BY public.repuestos.id_repuestos;
          public          postgres    false    222            y           2604    16730    accesorio id_accesorio    DEFAULT     �   ALTER TABLE ONLY public.accesorio ALTER COLUMN id_accesorio SET DEFAULT nextval('public.accesorio_id_accesorio_seq'::regclass);
 E   ALTER TABLE public.accesorio ALTER COLUMN id_accesorio DROP DEFAULT;
       public          postgres    false    215    214    215            |           2604    16751    cilindraje id_cilindraje    DEFAULT     �   ALTER TABLE ONLY public.cilindraje ALTER COLUMN id_cilindraje SET DEFAULT nextval('public.cilindraje_id_cilindraje_seq'::regclass);
 G   ALTER TABLE public.cilindraje ALTER COLUMN id_cilindraje DROP DEFAULT;
       public          postgres    false    220    221    221            z           2604    16737    marcas id_marcas    DEFAULT     t   ALTER TABLE ONLY public.marcas ALTER COLUMN id_marcas SET DEFAULT nextval('public.marcas_id_marcas_seq'::regclass);
 ?   ALTER TABLE public.marcas ALTER COLUMN id_marcas DROP DEFAULT;
       public          postgres    false    216    217    217            {           2604    16744    modelo id_modelo    DEFAULT     t   ALTER TABLE ONLY public.modelo ALTER COLUMN id_modelo SET DEFAULT nextval('public.modelo_id_modelo_seq'::regclass);
 ?   ALTER TABLE public.modelo ALTER COLUMN id_modelo DROP DEFAULT;
       public          postgres    false    218    219    219            }           2604    16758    repuestos id_repuestos    DEFAULT     �   ALTER TABLE ONLY public.repuestos ALTER COLUMN id_repuestos SET DEFAULT nextval('public.repuestos_id_repuestos_seq'::regclass);
 E   ALTER TABLE public.repuestos ALTER COLUMN id_repuestos DROP DEFAULT;
       public          postgres    false    222    223    223                      0    16727 	   accesorio 
   TABLE DATA           <   COPY public.accesorio (id_accesorio, accesorio) FROM stdin;
    public          postgres    false    215   _.                  0    16748 
   cilindraje 
   TABLE DATA           ?   COPY public.cilindraje (id_cilindraje, cilindraje) FROM stdin;
    public          postgres    false    221   �.                 0    16734    marcas 
   TABLE DATA           3   COPY public.marcas (id_marcas, marcas) FROM stdin;
    public          postgres    false    217   �.                 0    16741    modelo 
   TABLE DATA           3   COPY public.modelo (id_modelo, modelo) FROM stdin;
    public          postgres    false    219   H/       "          0    16755 	   repuestos 
   TABLE DATA           s   COPY public.repuestos (id_repuestos, repuestos, id_marcas, id_modelo, id_cilindraje, cantidad, precio) FROM stdin;
    public          postgres    false    223   �/       .           0    0    accesorio_id_accesorio_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.accesorio_id_accesorio_seq', 5, true);
          public          postgres    false    214            /           0    0    cilindraje_id_cilindraje_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.cilindraje_id_cilindraje_seq', 5, true);
          public          postgres    false    220            0           0    0    marcas_id_marcas_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.marcas_id_marcas_seq', 5, true);
          public          postgres    false    216            1           0    0    modelo_id_modelo_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.modelo_id_modelo_seq', 5, true);
          public          postgres    false    218            2           0    0    repuestos_id_repuestos_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.repuestos_id_repuestos_seq', 5, true);
          public          postgres    false    222                       2606    16732    accesorio accesorio_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.accesorio
    ADD CONSTRAINT accesorio_pkey PRIMARY KEY (id_accesorio);
 B   ALTER TABLE ONLY public.accesorio DROP CONSTRAINT accesorio_pkey;
       public            postgres    false    215            �           2606    16753    cilindraje cilindraje_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY public.cilindraje
    ADD CONSTRAINT cilindraje_pkey PRIMARY KEY (id_cilindraje);
 D   ALTER TABLE ONLY public.cilindraje DROP CONSTRAINT cilindraje_pkey;
       public            postgres    false    221            �           2606    16739    marcas marcas_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.marcas
    ADD CONSTRAINT marcas_pkey PRIMARY KEY (id_marcas);
 <   ALTER TABLE ONLY public.marcas DROP CONSTRAINT marcas_pkey;
       public            postgres    false    217            �           2606    16746    modelo modelo_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.modelo
    ADD CONSTRAINT modelo_pkey PRIMARY KEY (id_modelo);
 <   ALTER TABLE ONLY public.modelo DROP CONSTRAINT modelo_pkey;
       public            postgres    false    219            �           2606    16760    repuestos repuestos_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.repuestos
    ADD CONSTRAINT repuestos_pkey PRIMARY KEY (id_repuestos);
 B   ALTER TABLE ONLY public.repuestos DROP CONSTRAINT repuestos_pkey;
       public            postgres    false    223            �           2606    16773    repuestos fk_cilindraje    FK CONSTRAINT     �   ALTER TABLE ONLY public.repuestos
    ADD CONSTRAINT fk_cilindraje FOREIGN KEY (id_cilindraje) REFERENCES public.cilindraje(id_cilindraje);
 A   ALTER TABLE ONLY public.repuestos DROP CONSTRAINT fk_cilindraje;
       public          postgres    false    3205    223    221            �           2606    16763    repuestos fk_marcas    FK CONSTRAINT     |   ALTER TABLE ONLY public.repuestos
    ADD CONSTRAINT fk_marcas FOREIGN KEY (id_marcas) REFERENCES public.marcas(id_marcas);
 =   ALTER TABLE ONLY public.repuestos DROP CONSTRAINT fk_marcas;
       public          postgres    false    217    223    3201            �           2606    16768    repuestos fk_modelo    FK CONSTRAINT     |   ALTER TABLE ONLY public.repuestos
    ADD CONSTRAINT fk_modelo FOREIGN KEY (id_modelo) REFERENCES public.modelo(id_modelo);
 =   ALTER TABLE ONLY public.repuestos DROP CONSTRAINT fk_modelo;
       public          postgres    false    219    3203    223               T   x�3�t��MT�/��\F�>9�e�E�
!�9�\Ɯ>�U
)�
�%�\&��9�E�)@�e
�Z�X���X�X������ .�9          ,   x�3�440HN�2�442�Ɯ�� �	�Xܔ3Xߙ+F��� �5         9   x�3��ͯ*���2�tL/��I�2�.HMM	O��2�t���/��2�������� f'2         2   x�3��O�L��,.I�2��u�2���/*N�2�t��2�������� ��
	      "   m   x��K
�0םSx��.���z 7AF$����2՛*�1�)oW��h!"�`hG
���Bk�k����l��e+��a�b.���	���S������B�^)� U�m     