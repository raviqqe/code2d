module Main exposing (..)

import Html exposing (..)
import Html.Events exposing (onClick)
import Html.Attributes
import Time exposing (..)
import Css exposing (..)


-- Model


type Page
    = Menu
    | Timer


type alias Model =
    { page : Page, time : Int }


type Msg
    = Clock Time
    | Pause
    | Reset
    | Resume



-- View


styles : List Css.Mixin -> Attribute Msg
styles =
    Css.asPairs >> Html.Attributes.style


buttonStyle : Attribute Msg
buttonStyle =
    styles [ height (Css.em 3), width (Css.em 12) ]


view : Model -> Html Msg
view model =
    div
        [ styles
            [ height (vh 100)
            , width (vw 100)
            , backgroundColor (rgb 128 128 256)
            ]
        ]
        (case model.page of
            Menu ->
                [ div
                    [ styles
                        [ position relative
                        , top (pct 45)
                        , width (pct 50)
                        , height (pct 40)
                        , margin auto
                        , justifyContent spaceBetween
                        , displayFlex
                        ]
                    ]
                    [ button
                        [ onClick Reset, buttonStyle ]
                        [ Html.text "reset" ]
                    , button
                        [ onClick Resume, buttonStyle ]
                        [ Html.text "resume" ]
                    ]
                ]

            Timer ->
                [ div
                    [ onClick Pause
                    , styles
                        [ position relative
                        , top (pct 45)
                        , width (Css.em 6)
                        , height (Css.em 3)
                        , margin auto
                        , textAlign center
                        , color (rgb 255 255 255)
                        , fontSize (px 80)
                        ]
                    ]
                    [ Html.text (toString model.time) ]
                ]
        )



-- Controller


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Clock _ ->
            { model
                | time =
                    if model.page == Menu then
                        model.time
                    else
                        max 0 (model.time - 1)
            }
                ! []

        Pause ->
            { model | page = Menu } ! []

        Reset ->
            { page = Timer, time = 25 * 60 } ! []

        Resume ->
            { model | page = Timer } ! []


subscribe : Model -> Sub Msg
subscribe _ =
    Sub.batch [ every second Clock ]



-- Main


main : Program Never Model Msg
main =
    program
        { init = { page = Menu, time = 0 } ! []
        , update = update
        , view = view
        , subscriptions = subscribe
        }
