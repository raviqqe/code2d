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
    | Work
    | Break


type alias Model =
    { page : Page
    , time : Int
    }


type Msg
    = Clock Time
    | Pause
    | StartWork
    | StartBreak
    | Resume



-- View


view : Model -> Html Msg
view model =
    div [ class "valign-wrapper blue full-screen" ]
        (case model.page of
            Menu ->
                let
                    timerButton msg color text =
                        button
                            [ onClick msg, class ("btn-large " ++ color) ]
                            [ Html.text text ]
                in
                    [ div [ class "button-list" ]
                        [ timerButton StartWork "red" "work"
                        , timerButton StartBreak "green" "break"
                        , timerButton Resume "blue-grey" "resume"
                        ]
                    ]

            _ ->
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

                        _ ->
                            Basics.max 0 (model.time - 1)
            }
                ! if model.time == 1 then
                    [ check "Ring!" ]
                  else
                    []

        Pause ->
            { model | page = Menu } ! []

        StartWork ->
            { page = Work, time = 25 * 60 } ! []

        StartBreak ->
            { page = Break, time = 5 * 60 } ! []

        Resume ->
            { model | page = Work } ! []


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
