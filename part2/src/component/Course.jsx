const Header = (props) => {
    return(
        <h1>{props.course.name}</h1>
    )
}

const Parts = (props) => {
    console.log(props)
    return(
        <div>
            <p>{props.parts.name} {props.parts.exercises}</p>
        </div>
    )
}

const Content = (props) => {
    
    const differentPart = props.parts.map(element => {return <Parts key={element.id} parts={element}/>})


    return(
        <>{differentPart}</>
    )
}

const Total = (props) => {

    const totalValue = props.parts.reduce((sum, order) => sum + order.exercises, 0)


    return(
        <h3>total of {totalValue} exercises</h3>
    )
}

const Course = (props) => {
  return (
    <div>

        <Header course = {props.course}/>
        <Content parts = {props.course.parts}/>
        <Total parts = {props.course.parts}/>

      
    </div>
  )
}

export default Course