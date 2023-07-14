import React from "react";
import styled from "styled-components/macro";

const Btn=styled.button`
    width: ${props => props.width || 335}px;
    height: ${props => props.height || 59}px;
    border-radius: 5px;
    border-style: none;
    background      : ${props => props.background };
    color           :#${props => props.color        ||"FFFFFF"};
    margin-top      : ${props => props.m_top      }px;
    margin-right    : ${props => props.m_right    }px;
    margin-bottom   : ${props => props.m_bottom   }px;
    margin-left     : ${props => props.m_left     }px;
    position        : ${props => props.position   };
    top             : ${props => props.top        }px;
    right           : ${props => props.right      }px;
    bottom          : ${props => props.bottom     }px;
    left            : ${props => props.left       }px;
    align-self      : ${props => props.align      };
    justify-self    : ${props => props.justify    };
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size       : ${props => props.f_size   || 22}px;
    line-height     : ${props => props.f_height || 27}px;
    letter-spacing: 0.02em;
    &:hover{
        opacity: ${props => props.disabled ? 100 : 80}%;
    }
`

export default function Button(props) {
    const { 
        name        ,
        width       ,
        height      ,
        background  ,
        color       ,
        m_top       ,
        m_right     ,
        m_bottom    ,
        m_left      ,
        position    ,
        top         ,
        right       ,
        bottom      ,
        left        ,
        align       ,
        justify     ,
        f_size      ,
        f_height    ,
        disabled    ,
        onClick     ,
        type        ,
    } = props;

    const bg  = "#"+(background || "5970FF") + (disabled ? "88":"FF");

    return(
        <Btn 
            width       ={width     }
            height      ={height    }
            background  ={bg        }
            color       ={color     }
            m_top       ={m_top     }
            m_right     ={m_right   }
            m_bottom    ={m_bottom  }
            m_left      ={m_left    }
            position    ={position  }
            top         ={top       }
            right       ={right     }
            bottom      ={bottom    }
            left        ={left      }
            align       ={align     }
            justify     ={justify   }
            f_size      ={f_size    }
            f_height    ={f_height  }
            disabled    ={disabled  }
            onClick     ={onClick   }
            type        ={type      }
        >
            {name}
        </Btn>
    )
}