function Header ({user}) {
    return (
        <div 
        style={{
        position:"sticky", 
        top: 0,
        display: "flex", 
        justifyContent: "space-between",
        width: "100%",
        }}
        >
            <p>{user.name}</p>
            <h2>Sklep internetowy</h2>
        </div>
    );
}


export default Header;
