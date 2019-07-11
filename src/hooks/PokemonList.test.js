import React from 'react'
import {configure, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import PokemonList from './PokemonList';

configure({adapter:new Adapter()})

function HookWrapper(props){
    const pokemonList = props.hook ? props.hook() : undefined
    return <div hook={pokemonList}></div>
}

it("Should init hooks with loading true and page 1", ()=>{
    let wrapper = shallow(<HookWrapper hook={()=>PokemonList()}></HookWrapper>)

    let {hook} = wrapper.find('div').props();
    let {pokemonList, setPage, page, isLoading} = hook
    expect(isLoading).toEqual(true)
    expect(page).toEqual(1)
})
