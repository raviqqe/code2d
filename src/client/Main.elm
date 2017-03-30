port module Main exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Time exposing (..)


-- Javascript itnerop


port check : String -> Cmd msg


port suggestions : (List String -> msg) -> Sub msg



-- Model


type Page
    = Menu
    | Timer


type alias Model =
    { page : Page
    , time : Int
    }


type Msg
    = Clock Time
    | Pause
    | Reset
    | Resume



-- View


view : Model -> Html Msg
view model =
    div [ class "valign-wrapper light-blue darken-2 full-screen" ]
        (case model.page of
            Menu ->
                [ div [ class "horizontal-center" ]
                    [ button
                        [ onClick Reset, class "button btn-large" ]
                        [ Html.text "reset" ]
                    , button
                        [ onClick Resume, class "button btn-large" ]
                        [ Html.text "resume" ]
                    ]
                ]

            Timer ->
                [ div [ onMouseUp Pause, class "link-cursor valign-wrapper full-screen" ]
                    [ span
                        [ class "time horizontal-center" ]
                        [ Html.text (toString model.time) ]
                    ]
                ]
        )



-- Controller


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Clock _ ->
            { model
                | time =
                    case model.page of
                        Menu ->
                            model.time

                        Timer ->
                            Basics.max 0 (model.time - 1)
            }
                ! if model.time == 1 then
                    [ check "Ring!" ]
                  else
                    []

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
