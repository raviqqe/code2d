import Html exposing (..)
import Time exposing (..)


-- Model

type alias Model = { time : Float }

type Msg = NoOp | Delta Time


-- View

view : Model -> Html Msg
view model =
  body [] [ p [] [text "25"] ]


-- Controller

update : Msg -> Model -> (Model, Cmd Msg)
update msg model = model ! []

subscribe : Model -> Sub Msg
subscribe _ = Sub.batch [ every millisecond Delta ]


-- Main

main : Program Never Model Msg
main = program
  { init = { time = 0 } ! []
  , update = update
  , view = view
  , subscriptions = subscribe
  }
